<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($titulo_pag ?? 'Colegio de Ingenieros Civiles') ?></title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">

</head>

<body>
    <header class="site-header">
        <nav class="container nav-bar" aria-label="Navegación principal">
            <a class="brand" href="index.php">
                <img src="img/logo_carrera.png" alt="Logo del Colegio de Ingenieros Civiles">
                <span>Colegio de<br>Ingenieros Civiles</span>
            </a>
            <div class="nav-links">
                <a href="#novedades">Novedades</a>
                <a href="#tramites">Trámites</a>
                <a href="#atencion">Atención</a>
            </div>
            <a class="button button-dark nav-action" href="#atencion">Contáctanos <span aria-hidden="true">↗</span></a>
        </nav>
    </header>