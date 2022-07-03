<?php 

/**
 *  Non-production environment functionality.
 */
 
if ( 'production' !== wp_get_environment_type() ) {
 
    // Block crawling.
    add_filter( 'robots_txt', 'wptheme_block_crawling', 999 );
}
 
/**
 * Filters the robots.txt output to block crawling on non-production environment.
 *
 * @param string $output The robots.txt output.
 */
function wptheme_block_crawling( $output ) {
 
    $output = '# Crawling is blocked for non-production environment' . PHP_EOL;
    $output .= 'User-agent: *' . PHP_EOL;
    $output .= 'Disallow: /';
 
    return $output;
}

/**
 * Admin bar
 */
function wptheme_admin_bar() {
    if (is_user_logged_in()) {
        add_filter('show_admin_bar', '__return_true', 1000);
    }
}
add_action('init', 'wptheme_admin_bar');

/**
 * Register menu
 */
register_nav_menus(
    array(
        'main-menu' => __('Main menu', 'wptheme'),
   )
);

/**
 * Enqueue scripts and styles
 */
function wptheme_styles_and_scripts() {
  // enqueue theme stylesheet with timestamp
  // https://gist.github.com/MwieMarin/2d7a38d3825ed1bf44e82ef48b3badf9
  wp_enqueue_style( 'theme-styles', get_stylesheet_directory_uri() . '/style.css', array(), filemtime( get_stylesheet_directory() . '/style.css' ) );

  // enqueue theme script in footer
  wp_enqueue_script( 'theme-scripts', get_stylesheet_directory_uri() . '/main.js', array(), filemtime( get_stylesheet_directory() . '/scripts.js' ), true );
}
add_action('wp_enqueue_scripts', 'wptheme_styles_and_scripts');
/*
 * Register Sidebars
 */
function wptheme_blog_right_sidebar()
{
        $args = array(
                'id'            => 'blog_right_sidebar',
                'class'         => 'blog_right_sidebar',
                'name'          => __('Blog right sidebar', 'newtheme'),
                'before_title'  => '<h2 class="widget-title">',
                'after_title'   => '</h2>',
                'before_widget' => '<div id="%1$s" class="widget %2$s">',
                'after_widget'  => '</div>',
        );
        register_sidebar($args);
}
add_action('widgets_init', 'wptheme_blog_right_sidebar');

/*
 * Numbered Pagination
 */
function wptheme_pagination($pages = '', $range = 4) {        
    $showitems = ($range * 2)+1;  
 
    global $paged;
    if(empty($paged)) $paged = 1;
 
    if($pages == '') {
        global $wp_query;
        $pages = $wp_query->max_num_pages;
        if(!$pages) {
            $pages = 1;
        }
    }   
 
    if(1 != $pages) {
       	if($paged > 2 && $paged > $range+1 && $showitems < $pages) echo "<a href='".get_pagenum_link(1)."'>&laquo; First</a>";
        if($paged > 1 && $showitems < $pages) echo "<a href='".get_pagenum_link($paged - 1)."'>&lsaquo; Previous</a>";
 
        for ($i=1; $i <= $pages; $i++) {
            if (1 != $pages &&( !($i >= $paged+$range+1 || $i <= $paged-$range-1) || $pages <= $showitems )) {
             	echo ($paged == $i)? "<span class=\"current\">".$i."</span>":"<a href='".get_pagenum_link($i)."' class=\"inactive\">".$i."</a>";
            }
        }
 
        if ($paged < $pages && $showitems < $pages) echo "<a href=\"".get_pagenum_link($paged + 1)."\">Next &rsaquo;</a>";  
        if ($paged < $pages-1 &&  $paged+$range-1 < $pages && $showitems < $pages) echo "<a href='".get_pagenum_link($pages)."'>Last &raquo;</a>";
        //  echo "</div>\n";
    }
}

/*
 * Thumbnails
 */
add_theme_support( 'post-thumbnails' );
