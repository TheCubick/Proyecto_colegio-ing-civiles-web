<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> <?php echo $titulo_pag ?? 'Titulo de Pagina' ?></title>

    <link rel="stylesheet" href="../css/style.css">

    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Iconos Lucide -->
    <script src="https://unpkg.com/lucide@latest"></script>

</head>

    <body>
        <!-- los colores se cambiarán claro -->
        <header class="bg-[#CFBCBC] border-b border-gray-200 shadow-[##A88585]">
            <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div class="font-bold text-lg text-[##0F0B0B]">
                    Colegio de Ingenieros Civiles (Los más capitos)
                </div>
                <ul class="flex space-x-6 text-sm font-medium text-[##0F0B0B]">
                    <li class="hover:text-[#ffffff] cursor-pointer transition">Novedades</li>
                    <li class="hover:text-[#ffffff] cursor-pointer transition">Tramites</li>
                    <li class="hover:text-[#ffffff] cursor-pointer transition">Atención</li>
                </ul>
            </nav>
        </header>

    </body>
</html>