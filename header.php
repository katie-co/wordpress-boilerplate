<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">

<head>
	<title><?php wp_title(''); ?></title>
	<meta charset="UTF-8">
	<?php wp_head(); ?>

</head>

<body class="body">
	<header class="header">
		<nav class="header__navbar">
			<?php
			wp_nav_menu(array(
				'theme_location' => 'main-menu',
				'container'      => 'ul',
				'menu_class'     => 'header__nav-list',
				'depth'          => 0,
			))
			?>
		</nav>
	</header>
	<main id="main" class="main">