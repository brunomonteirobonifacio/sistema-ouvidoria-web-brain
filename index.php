<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <title>Ouvidoria</title>
</head>
<body>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
            <a class="nav-link" href="#">Features</a>
            <a class="nav-link" href="#">Pricing</a>
            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
          </div>
        </div>
      </div>
    </nav>
    <div class="container">
        <p>
            Logado como <span class="username"></span>
        </p>
        <p>
            Bem vindo ao site da Ouvidoria pública. 
            <?php
                session_start();

                if (!isset($_SESSION['userId'])) {
            ?>
            Para ter acesso à criação de ouvidorias,
            <a href="pages/signup.php">Crie uma conta</a>
        </p>
        <p>
            Já tem uma conta? <a href="pages/login.php">Fazer login</a>
        </p>
        <?php
            } else {
                ?>
                Para criar uma ouvidoria, <a href="pages/create_manifestation.php">clique aqui</a>
                
                <?php
            }
        ?>
    </div>
</body>
<script src="jquery/jquery.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
<script src="jquery/jquery-mask/dist/jquery.mask.js"></script>
<script src="jquery/jquery-mask/dist/jquery.mask.min.js"></script>

<script src="js-scripts/general.js"></script>
<script src="js-scripts/user.js"></script>
</html>