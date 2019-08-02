<!-- FULL WIDTH, Shared INCLUDES-->
<?php
// Include html header to opening body tag
include( "inc/Shared/1-HeadBody.html" );
// Include 'skip to main' link
include( "inc/Shared/2-SkipMain.html" );
// Include main navigation (pure javascript)
include( "inc/Shared/3-MainNav.html" );
// Include breadcrumb
include( "inc/Shared/4-BreadNav.html" );
// Include green account bar
include( "inc/Shared/5-AccountBar.html" );
?>

<!-- BEGIN TWO COLUMN RIGHT SIDEBAR PAGE LAYOUT-->
<!-- Site max width container-->
<div class="container-fluid bg-white site-max">
    <!-- Start row-->
    <div class="row">
        <!-- 'Main' page content -->
        <main id="main" class="col-12">

            <?php
            // Include page
            include( "inc/Pages/Waste/WasteItemPage.html" );
            ?>

        <!-- Right sidebar-->
        <div class="sidebar col-md-4 order-2 mt-0">
            <?php
            // Include simple menu
            include( "inc/SideBars/NavSimpleSideBar.html" );
            ?>
        </div><!-- End right sidebar -->

        </main><!-- End 'Main' page content -->
            
    </div> <!-- End row -->
</div> <!-- End max width container -->
<!-- END PAGE LAYOUT-->

<!-- FULL WIDTH, Shared INCLUDES-->
<?php
// Dark footer 2 rows
include( "inc/Shared/7-Footer.html" );
// Footer navigation
include( "inc/Shared/8-FooterNav.html" );
// Cookie alert bar
include( "inc/Shared/9-CookieAlert.html" );
// Call javascript, end body and HTML
include( "inc/Shared/10-ScriptsBodyHTMLClose.html" );
?>