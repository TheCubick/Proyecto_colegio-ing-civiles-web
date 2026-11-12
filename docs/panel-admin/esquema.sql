-- =========================================================================
-- 1. FUNCIONES AUXILIARES PARA RLS (Evitan recursividad y optimizan permisos)
-- =========================================================================

-- Comprueba si el usuario autenticado es 'admin'
create or replace function public.is_admin()
returns boolean
security definer
set search_path = public
as $$
begin
    return exists (
        select 1 from public.perfiles
        where id = auth.uid() and rol = 'admin'
    );
end;
$$ language plpgsql;

-- Comprueba si el usuario autenticado es 'editor' o 'admin'
create or replace function public.is_editor_or_admin()
returns boolean
security definer
set search_path = public
as $$
begin
    return exists (
        select 1 from public.perfiles
        where id = auth.uid() and rol in ('editor', 'admin')
    );
end;
$$ language plpgsql;


-- =========================================================================
-- 2. CREACIÓN DE TABLAS
-- =========================================================================

-- 1. Tabla perfiles
create table public.perfiles (
    id uuid primary key references auth.users(id) on delete cascade,
    nombre text not null,
    rol text not null check (rol in ('editor', 'admin')),
    creado_en timestamptz default now() not null
);

-- 2. Tabla noticias
create table public.noticias (
    id uuid primary key default gen_random_uuid(),
    titulo text not null,
    texto text not null,
    imagen_url text,
    fecha_publicacion date,
    publicado boolean default false not null,
    creado_por uuid references public.perfiles(id) on delete set null,
    creado_en timestamptz default now() not null,
    actualizado_en timestamptz default now() not null
);

-- 3. Tabla cursos
create table public.cursos (
    id uuid primary key default gen_random_uuid(),
    titulo text not null,
    fecha_texto text, -- Ej: «Inicia: 15 de noviembre»
    horario text,
    modalidad text check (modalidad = 'Presencial') default 'Presencial' not null,
    descripcion text,
    imagen_url text,
    temario_url text,
    publicado boolean default false not null,
    creado_por uuid references public.perfiles(id) on delete set null,
    creado_en timestamptz default now() not null
);

-- 4. Tabla asambleas
create table public.asambleas (
    id uuid primary key default gen_random_uuid(),
    tipo text not null check (tipo in ('Ordinaria', 'Extraordinaria')),
    fecha date,
    lugar text,
    titulo text not null,
    resumen text[],
    acuerdos text[],
    fotos jsonb, -- Estructura esperada: lista de objetos [{ "src": "...", "alt": "..." }]
    publicado boolean default false not null,
    creado_por uuid references public.perfiles(id) on delete set null,
    creado_en timestamptz default now() not null
);


-- =========================================================================
-- 3. TRIGGERS DE UTILIDAD (Actualizar timestamps y proteger roles)
-- =========================================================================

-- Trigger para actualizar automáticamente 'actualizado_en' en noticias
create or replace function public.actualizar_timestamp_noticias()
returns trigger as $$
begin
    new.actualizado_en = now();
    return new;
end;
$$ language plpgsql;

create trigger tr_noticias_actualizado_en
    before update on public.noticias
    for each row
    execute function public.actualizar_timestamp_noticias();


-- Trigger de seguridad: Solo un admin puede modificar el campo 'rol' de un perfil
create or replace function public.proteger_rol_perfil()
returns trigger as $$
begin
    if old.rol is distinct from new.rol and not public.is_admin() then
        raise exception 'Acceso denegado: Solo los administradores pueden cambiar los roles.';
    end if;
    return new;
end;
$$ language plpgsql;

create trigger tr_proteger_rol_perfil
    before update on public.perfiles
    for each row
    execute function public.proteger_rol_perfil();


-- =========================================================================
-- 4. ACTIVAR ROW LEVEL SECURITY (RLS) EN TODAS LAS TABLAS
-- =========================================================================

alter table public.perfiles enable row level security;
alter table public.noticias enable row level security;
alter table public.cursos enable row level security;
alter table public.asambleas enable row level security;


-- =========================================================================
-- 5. POLÍTICAS RLS (ROW LEVEL SECURITY)
-- =========================================================================

--- -------------------------------------------------------------------------
--- Políticas para PERFILES
--- -------------------------------------------------------------------------
-- Leer: Cada usuario lee su propia fila, y los administradores pueden leer todas.
create policy "Perfiles: lectura propia o admin"
    on public.perfiles for select
    using (auth.uid() = id or public.is_admin());

-- Insertar: Un usuario recién registrado puede crear su propio perfil.
create policy "Perfiles: insercion propia"
    on public.perfiles for insert
    with check (auth.uid() = id);

-- Actualizar: El usuario puede editar su propio perfil (el rol está protegido por trigger si no es admin).
create policy "Perfiles: actualizacion propia o admin"
    on public.perfiles for update
    using (auth.uid() = id or public.is_admin());

-- Borrar: Solo los administradores pueden eliminar perfiles.
create policy "Perfiles: eliminacion solo admin"
    on public.perfiles for delete
    using (public.is_admin());


--- -------------------------------------------------------------------------
--- Políticas para NOTICIAS
--- -------------------------------------------------------------------------
-- Leer: Anon y autenticados leen solo si publicado=true. Editores/admins leen todo.
create policy "Noticias: lectura publica y de gestion"
    on public.noticias for select
    using (publicado = true or public.is_editor_or_admin());

-- Modificar (Insert, Update, Delete): Solo editores y administradores.
create policy "Noticias: gestion por editores y admins"
    on public.noticias for all
    using (public.is_editor_or_admin())
    with check (public.is_editor_or_admin());


--- -------------------------------------------------------------------------
--- Políticas para CURSOS
--- -------------------------------------------------------------------------
-- Leer: Anon y autenticados leen solo si publicado=true. Editores/admins leen todo.
create policy "Cursos: lectura publica y de gestion"
    on public.cursos for select
    using (publicado = true or public.is_editor_or_admin());

-- Modificar (Insert, Update, Delete): Solo editores y administradores.
create policy "Cursos: gestion por editores y admins"
    on public.cursos for all
    using (public.is_editor_or_admin())
    with check (public.is_editor_or_admin());


--- -------------------------------------------------------------------------
--- Políticas para ASAMBLEAS
--- -------------------------------------------------------------------------
-- Leer: Anon y autenticados leen solo si publicado=true. Editores/admins leen todo.
create policy "Asambleas: lectura publica y de gestion"
    on public.asambleas for select
    using (publicado = true or public.is_editor_or_admin());

-- Modificar (Insert, Update, Delete): Solo editores y administradores.
create policy "Asambleas: gestion por editores y admins"
    on public.asambleas for all
    using (public.is_editor_or_admin())
    with check (public.is_editor_or_admin());