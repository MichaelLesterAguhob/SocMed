
<?php include_once('../backend/session.php'); ?>

<!DOCTYPE html>
<html lang="en"> 
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="../assets/image/fav.ico">
    <title>SocMed</title>
    <!-- <link rel="stylesheet" href="../assets/css/index.css"> -->
    <link rel="stylesheet" href="../assets/bootstrap/bootstrap-5.3.3-dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="../assets/css/header.css">
    <link rel="stylesheet" href="../assets/css/footer.css">
    <link rel="stylesheet" href="../assets/css/profile.css">
</head>
<body>

    <div class="main-container container-fluid">
        <!-- HEADER/ NAVIGATION BAR -->
       <?php include("../includes/header.php") ?>
       
        <!-- PROFILE -->
        <div id="profileContainer" class="row">

            <div id="profileColumn" class="col-lg-4">

                <!-- PROFILE PICTURE CONTAINER -->
                <div id="profilePicCont">
                    <!-- Profile Picture -->
                    <img id="profilePicture" src="" alt="Your Profile Picture">

                    <!-- Upload and edit Button -->
                     <div class="uploadEditPictureCont">
                         <button type="button" id="btnUploadProfilePic"></button>
                         <button type="button" id="btnEditProfilePic"></button>

                         <!-- save and cancel uploaded profile-->
                         <button type="button" class="btn btn-sm btn-success btnSaveDiscard" id="btnSaveProfilePict">Save</button>
                         <button type="button" class="btn btn-sm btn-warning btnSaveDiscard" id="btnDiscardDp">Discard</button>
                    </div>
                </div>

                <!-- IMAGE FILE INPUT -->
                <input id="profilePictureInput" type="file" accept=".jpeg, .jpg">
                <!-- User name -->
                <h2 id="userName" class="pt-4 pb-4">Your Name here</h2>

                <!-- USER BIO -->
                <div id="bioCont">
                    <h6 class="text-primary cont">Bio</h6>
                    <p id="bioContent" class="text-muted">I am Web Developer</p>
                </div>

                <!-- USER SOCIALS/CONTACT -->
                <div id="socialCont">
                    <h6 class="text-primary cont">Social</h6>
                    <p id="socialContent" class="text-muted">My facebook</p>
                </div>
                <div id="contactCont">
                    <h6 class="text-primary cont">Contact</h6>
                    <p id="contactContent" class="text-muted">My Email</p>
                </div>

                <!-- PROFILE EDIT PROFILE AND CREATE POST CONTAINER -->
                <div id="btnCont">
                    <button type="button" class="btn btn-warning btn-sm">Edit Profile</button>
                    <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#createPostModal">Create Post</button>
                </div>
            </div>


            <!-- POST IN PROFILE PAGE -->
            <div id="profilePost" class="col-lg-8 pt-3">
                <!-- user posts are loaded here -->
            </div>

        </div>

        <!-- Modal where user can create a post -->
        <div id="createPostModal" class="modal fade" tabindex="-1">
            <div class="modal-dialog create-post-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title user-select-none">Post</h2>
                        <button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="modal" data-bs-target="#createPostModal"></button>
                    </div>
                    <div class="modal-body create-post-modal-body">
                        <div class="form-floating mb-3">
                             <textarea id="postCaptions" class="form-control" placeholder="Start typing here"></textarea>
                            <label class="user-select-none" for="postCaptions">Say Something</label>
                        </div>
                        
                       <h4 class="user-select-none">Upload image</h4>
                       <div>
                            <h5>image here</h5>
                       </div>
                    </div>

                    <div class="modal-footer create-post-modal-footer">
                        <button type="button" id="btnPost" class="btn btn-success createPostBtn">Post</button>
                        <button type="button" id="btnDiscardPost" class="btn btn-warning createPostBtn" data-bs-dismiss="modal" data-bs-target="#createPostModal">Discard</button>
                    </div>
                </div>
            </div>
        </div>


        <!-- Emoji Reaction Modal -->
         <div id="reactEmojiModal" class="modal fade">
            <div class="modal-dialog reactEmojiModalDialog">
                <div class="modal-content">
                    <div class="modal-header reactEmojiModalHeader">
                        <h5 class="modal-title user-select-none">Select Emoji</h5>
                        <button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="modal" data-bs-target="#reactEmojiModal"></button>
                    </div>
                    
                    <div class="modal-body reactEmojiModalBody">
                        <button type="button" class="btnReact">
                            <img src="../assets/image/like.png" alt=""><span class="react-text text-muted react-text-like">Like</span>    
                        </button>
                        <button type="button" class="btnReact">
                            <img src="../assets/image/dislike.png" alt=""><span class="react-text text-muted react-text-boo">Dislike</span>    
                        </button>
                        <button type="button" class="btnReact">
                            <img src="../assets/image/haha.png" alt=""><span class="react-text text-muted react-text-haha">Haha</span>    
                        </button>
                        <button type="button" class="btnReact">
                            <img src="../assets/image/love.png" alt=""><span class="react-text text-muted react-text-love">Love</span>    
                        </button>
                        <button type="button" class="btnReact">
                            <img src="../assets/image/eyesHeart.png" alt=""><span class="react-text text-muted react-text-love">InLove</span>    
                        </button>
                        <button type="button" class="btnReact">
                            <img src="../assets/image/wow.png" alt=""><span class="react-text text-muted react-text-wow">Wow</span>    
                        </button>
                        <button type="button" class="btnReact">
                            <img src="../assets/image/angry.png" alt=""><span class="react-text text-muted react-text-angry">Angry</span>    
                        </button>
                    </div>
                </div>
            </div>
         </div>

         <!-- Write comment modal -->
         <div id="writeCommentModal" class="modal fade">
            <div class="modal-dialog write-comment-modal-dialog">
                <div class="modal-content write-comment-modal-content">
                    <div class="modal-header write-comment-modal-header">
                        <h5 class="modal-title">Write a comment</h5>
                        <button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="modal" data-bs-target="#writeCommentModal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-floating">
                            <textarea id="inputComment" class="form-control" placeholder=" "></textarea>
                            <label for="inputComment">Comment...</label>
                        </div>
                    </div>
                    <div class="modal-footer write-comment-modal-footer">
                        <button type="button" class="btn btn-success writeCommentBtn">Submit</button>
                        <button type="button" class="btn btn-warning writeCommentBtn" data-bs-dismiss="modal" data-bs-target="#writeCommentModal">Cancel</button>
                    </div>
                </div>
            </div>
         </div>
    </div>

    <!-- Modal popup message -->
    <div id="popupMessgaeModal" class="modal fade">
        <div class="modal-dialog popup-message-modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <strong class="modal-title popupMessageTitle"></strong>
                    <button class="btn-close"></button>
                </div>
                <div id="popupMessageBody" class="modal-body">

                </div>
            </div>
        </div>
    </div>

    <!-- Toast Notification -->
    <div class="toast-container position-fixed bottom-0 start-0 p-3">
        <div id="myToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="5000">
            <div class="toast-header">
                <strong class="me-auto">Notification</strong>
                <small class="text-muted">Just now</small>
               <button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="toast"></button>
            </div>
            <div id="toastMessage" class="toast-body text-success">
                <!-- Toast modal here -->
            </div>
        </div>
    </div>


     <!-- FOOTER -->
    <?php include('../includes/footer.php'); ?>

    <!-- JAVASCRIPT -->
    <script src="../assets/bootstrap/bootstrap-5.3.3-dist/js/bootstrap.min.js"></script>
    <script src="../assets/bootstrap/bootstrap-5.3.3-dist/js/jquery-3.7.1.js"></script>

    <script src="../assets/js/header.js"></script>
    <script src="../assets/js/profile.js"></script>
</body>
</html>