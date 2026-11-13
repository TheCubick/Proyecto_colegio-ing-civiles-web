-- =========================================================================
-- CONSULTAS DEL PANEL ADMINISTRATIVO (F2-DB3)
-- Basadas en docs/panel-admin/esquema.sql (tablas noticias, cursos y asambleas).
--
-- Cómo usarlas:
--   - En el SQL Editor de Supabase: reemplaza los valores marcados con «<…>».
--   - Desde el frontend (supabase-js) se hacen las mismas operaciones con
--     .from('noticias').select() / .insert() / .update() / .delete(); al final
--     de cada bloque hay el equivalente en JavaScript como comentario.
--   - Las políticas RLS del esquema deciden quién puede hacer qué:
--       · público (anon): solo lee filas con publicado = true;
--       · editor / admin: lee todo y puede crear, editar y borrar.
--     En el SQL Editor se entra como «postgres» y RLS NO se aplica: prueba los
--     permisos desde el sitio o con «set role authenticated» + JWT de prueba.
--
-- Prohibido: datos reales de personas, teléfonos o correos en las pruebas.
-- Usa siempre textos que digan 'PRUEBA'.
-- =========================================================================


-- =========================================================================
-- 1. NOTICIAS (muro de «Cursos y Capacitación»)
-- =========================================================================

-- 1.1 Noticias publicadas, de la más reciente a la más antigua (lo que ve el público).
select id, titulo, texto, imagen_url, fecha_publicacion
from public.noticias
where publicado = true
order by fecha_publicacion desc nulls last, creado_en desc;
-- JS: supabase.from('noticias').select('id,titulo,texto,imagen_url,fecha_publicacion')
--       .eq('publicado', true).order('fecha_publicacion', { ascending: false })

-- 1.2 TODAS las noticias, incluidas las no publicadas (vista del editor).
select id, titulo, publicado, fecha_publicacion, creado_en, actualizado_en
from public.noticias
order by creado_en desc;

-- 1.3 Crear una noticia (nace oculta; se publica con 1.5).
insert into public.noticias (titulo, texto, imagen_url, fecha_publicacion, publicado, creado_por)
values (
    'PRUEBA · Título de la noticia',
    'PRUEBA · Texto de la noticia.',
    null,                       -- o la URL pública del archivo en Supabase Storage
    current_date,
    false,
    auth.uid()                  -- en el SQL Editor es null; desde el sitio, el usuario conectado
)
returning id;

-- 1.4 Editar una noticia (actualizado_en se pone solo con el trigger del esquema).
update public.noticias
set titulo = 'PRUEBA · Título corregido',
    texto  = 'PRUEBA · Texto corregido.'
where id = '<id-de-la-noticia>';

-- 1.5 Publicar una noticia.
update public.noticias
set publicado = true,
    fecha_publicacion = coalesce(fecha_publicacion, current_date)
where id = '<id-de-la-noticia>';

-- 1.6 Ocultar una noticia (deja de verse en el sitio, pero no se borra).
update public.noticias
set publicado = false
where id = '<id-de-la-noticia>';

-- 1.7 Borrar una noticia definitivamente (preferir 1.6 si hay duda).
delete from public.noticias
where id = '<id-de-la-noticia>';


-- =========================================================================
-- 2. CURSOS (regla del Colegio: modalidad siempre 'Presencial')
-- =========================================================================

-- 2.1 Cursos publicados (lo que ve el público).
--     La tabla guarda la fecha como texto libre (fecha_texto, ej. «Inicia: 15 de noviembre»),
--     así que «próximos» se ordena por el más reciente en cargarse.
select id, titulo, fecha_texto, horario, modalidad, descripcion, imagen_url, temario_url
from public.cursos
where publicado = true
order by creado_en desc;

-- 2.2 Próximos cursos publicados (los 4 más recientes, para la portada).
select id, titulo, fecha_texto, horario
from public.cursos
where publicado = true
order by creado_en desc
limit 4;

-- 2.3 TODOS los cursos (vista del editor).
select id, titulo, fecha_texto, publicado, creado_en
from public.cursos
order by creado_en desc;

-- 2.4 Crear un curso (la modalidad la pone el esquema: 'Presencial').
insert into public.cursos (titulo, fecha_texto, horario, descripcion, imagen_url, temario_url, publicado, creado_por)
values (
    'PRUEBA · Nombre del curso',
    'Inicia: PRUEBA',
    'PRUEBA · Sábados',
    'PRUEBA · Descripción tal cual la mande el Colegio.',
    null,
    null,
    false,
    auth.uid()
)
returning id;

-- 2.5 Editar un curso.
update public.cursos
set fecha_texto = 'Inicia: PRUEBA (cambio)',
    horario     = 'PRUEBA · Sábados (cambio)'
where id = '<id-del-curso>';

-- 2.6 Publicar / ocultar un curso.
update public.cursos set publicado = true  where id = '<id-del-curso>';
update public.cursos set publicado = false where id = '<id-del-curso>';

-- 2.7 Borrar un curso.
delete from public.cursos
where id = '<id-del-curso>';


-- =========================================================================
-- 3. ASAMBLEAS
-- =========================================================================

-- 3.1 Asambleas publicadas, de la más reciente a la más antigua.
select id, tipo, fecha, lugar, titulo, resumen, acuerdos, fotos
from public.asambleas
where publicado = true
order by fecha desc nulls last;

-- 3.2 TODAS las asambleas (vista del editor).
select id, tipo, fecha, titulo, publicado
from public.asambleas
order by fecha desc nulls last, creado_en desc;

-- 3.3 Crear una asamblea.
--     resumen y acuerdos son listas de texto (text[]); fotos es una lista JSON de { src, alt }.
insert into public.asambleas (tipo, fecha, lugar, titulo, resumen, acuerdos, fotos, publicado, creado_por)
values (
    'Ordinaria',                              -- u 'Extraordinaria'
    current_date,
    'PRUEBA · Lugar',
    'PRUEBA · Título de la asamblea',
    array['PRUEBA · Punto 1 del resumen', 'PRUEBA · Punto 2'],
    array['PRUEBA · Acuerdo 1'],
    '[{"src": "https://PRUEBA/foto.jpg", "alt": "PRUEBA · Descripción de la foto"}]'::jsonb,
    false,
    auth.uid()
)
returning id;

-- 3.4 Editar una asamblea (ejemplo: agregar un acuerdo al final de la lista).
update public.asambleas
set acuerdos = array_append(acuerdos, 'PRUEBA · Acuerdo nuevo')
where id = '<id-de-la-asamblea>';

-- 3.5 Publicar / ocultar una asamblea.
update public.asambleas set publicado = true  where id = '<id-de-la-asamblea>';
update public.asambleas set publicado = false where id = '<id-de-la-asamblea>';

-- 3.6 Borrar una asamblea.
delete from public.asambleas
where id = '<id-de-la-asamblea>';


-- =========================================================================
-- 4. LIMPIEZA DE PRUEBAS
-- Borra todo lo que se creó con las consultas de arriba (textos con 'PRUEBA').
-- =========================================================================
delete from public.noticias  where titulo like 'PRUEBA%';
delete from public.cursos    where titulo like 'PRUEBA%';
delete from public.asambleas where titulo like 'PRUEBA%';
