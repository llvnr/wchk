<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Equativa - Service Name.</title>

    <link rel="stylesheet" href="{{ asset("css/style.css") }}">
    <link rel="stylesheet" href="{{ asset("css/responsive.css") }}">
    {{-- <link rel="stylesheet" href="{{ asset("css/dark.css") }}"> --}}
    <link rel="stylesheet" id="cssNormalService">
    <link rel="stylesheet" id="cssResponsiveService">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css" crossorigin="anonymous">

</head>
<body>
    
    <div class="Shell">

        <div class="ShellTop">

            <div class="ShellTop__left" id="ShellTop__left"></div>
            <div class="ShellCenter" id="ShellCenter"></div>
            <div class="ShellTop__right" id="ShellTopRight"></div>

        </div>
        <div class="ShellBody" id="ShellBody"></div>
        <div class="ShellBottom" id="ShellBottom"></div>

    </div>

    <script src="{{ asset("js/app.js") }}" type="module"></script>

</body>
</html>