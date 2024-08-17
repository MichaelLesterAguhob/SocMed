<nav class="navbar navbar-expand-sm">
    <div class="container-fluid">
        <a href="#" class="navbar-brand">
            <img src="../assets/image/logo.png" alt="logo" class="logo rounded-pill">
            <!-- <img src="" alt="logo" class="rounded-pill"> -->
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#colapsibleMenu">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="colapsibleMenu">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a id="btnHome" href="../pages/home.php" class="nav-link" >Home</a>
                </li>
                <li class="nav-item">
                    <a id="btnFriends" href="../pages/friends.php" class="nav-link" >Friends</a>
                </li>
                    <li class="nav-item">
                    <a id="btnMessage" href="../pages/messages.php" class="nav-link" >Messages</a>
                </li>
                <li class="nav-item">
                    <a id="btnProfile" href="../pages/profile.php" class="nav-link" >Profile</a>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <button class="nav-link">
                        <img src="../assets/bootstrap/icon/bootstrap-icons-1.11.3/bell.svg" alt="Notif">
                    </button>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a href="" class="nav-link" data-bs-toggle="modal" data-bs-target="#settings-modal" ><img src="../assets/bootstrap/icon/bootstrap-icons-1.11.3/gear.svg" alt="Settings"></a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<!-- Modal for settings -->
<div id="settings-modal" class="modal fade" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog settings-dialog">
        <div class="modal-content settings-content">
            <div class="modal-header settings-header">
                <h3 class="modal-title fs-5">Settings</h3>
                <button class="btn-close" aria-label="Close" data-bs-dismiss="modal" data-bs-target="#settings-modal"></button>
            </div>
            <div class="modal-body settings-body">
                <h5><a id="logout" href="../backend/logout.php">Logout</a></h5> 
            </div> 
        </div>
    </div>
</div>