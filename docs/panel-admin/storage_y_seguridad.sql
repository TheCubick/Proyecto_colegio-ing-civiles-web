-- =========================================================================
-- STORAGE Y AJUSTES DE SEGURIDAD DEL PANEL ADMINISTRATIVO
-- Ejecutar en Supabase › SQL Editor DESPUÉS de docs/panel-admin/esquema.sql.
-- Lo usa el panel /admin (visuales/src/pages/Admin) para subir fotos y temarios.
-- =========================================================================


-- -------------------------------------------------------------------------
-- 1. BUCKET «multimedia» (fotos de noticias, cursos y asambleas; temarios PDF)
--    Público para LEER (el sitio muestra las fotos sin sesión).
--    Límite: 5 MB por archivo y solo imágenes JPG/PNG/WebP y PDF.
--    (El panel ya comprime las fotos a menos de 280 KB antes de subirlas.)
--    Si el bucket ya se creó desde el tablero (Storage › New bucket), este paso
--    solo ajusta límite y tipos; no crea uno nuevo.
-- -------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
    'multimedia',
    'multimedia',
    true,
    5242880,
    array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;


-- -------------------------------------------------------------------------
-- 2. POLÍTICAS DE STORAGE
--    Lectura: cualquiera (el bucket es público).
--    Subir, reemplazar y borrar: solo editores y admins (funciones de esquema.sql).
--    Si ya creaste tus políticas desde el tablero, NO hace falta este paso
--    (crearía políticas repetidas con otro nombre).
-- -------------------------------------------------------------------------
drop policy if exists "Multimedia: lectura publica" on storage.objects;
create policy "Multimedia: lectura publica"
    on storage.objects for select
    using (bucket_id = 'multimedia');

drop policy if exists "Multimedia: subir editores y admins" on storage.objects;
create policy "Multimedia: subir editores y admins"
    on storage.objects for insert
    with check (bucket_id = 'multimedia' and public.is_editor_or_admin());

drop policy if exists "Multimedia: actualizar editores y admins" on storage.objects;
create policy "Multimedia: actualizar editores y admins"
    on storage.objects for update
    using (bucket_id = 'multimedia' and public.is_editor_or_admin());

drop policy if exists "Multimedia: borrar editores y admins" on storage.objects;
create policy "Multimedia: borrar editores y admins"
    on storage.objects for delete
    using (bucket_id = 'multimedia' and public.is_editor_or_admin());


-- -------------------------------------------------------------------------
-- 3. CORRECCIÓN DE SEGURIDAD EN «perfiles» (hallazgo al revisar esquema.sql)
--    La política «Perfiles: insercion propia» deja que cualquier cuenta nueva
--    cree SU PROPIO perfil con rol 'admin' (el trigger solo protege UPDATE).
--    Si el registro público estuviera activo, cualquiera podría volverse admin.
--    Solución: solo un admin crea perfiles (las cuentas las da de alta Pablo).
-- -------------------------------------------------------------------------
drop policy if exists "Perfiles: insercion propia" on public.perfiles;

create policy "Perfiles: insercion solo admin"
    on public.perfiles for insert
    with check (public.is_admin());

-- El PRIMER admin se crea desde el SQL Editor (ahí no aplica RLS), después de invitar
-- la cuenta en Authentication › Users. Reemplaza el correo:
--
-- insert into public.perfiles (id, nombre, rol)
-- select id, 'Administrador del panel', 'admin'
-- from auth.users where email = '<correo-del-administrador>';
--
-- Para un editor, lo mismo con rol 'editor'.


-- -------------------------------------------------------------------------
-- 4. AJUSTES QUE SE HACEN EN EL TABLERO DE SUPABASE (no son SQL)
--    - Authentication › Sign In / Providers › Email: DESACTIVAR «Allow new users to sign up».
--      Las cuentas solo se crean por invitación.
--    - Authentication › URL Configuration: poner la URL publicada del sitio.
--    - Nunca copiar la «service_role key» al sitio ni a git.
-- -------------------------------------------------------------------------
