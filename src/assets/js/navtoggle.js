// Script to hide/show menu
// Main navigation mobile menu toggle (Pure JS)
(function() {

	var hamburger = {
		navToggle: document.querySelector('#js-nav-toggle'),
		nav: document.querySelector('#menu-purejs'),
		iconClosed: document.querySelector('#js-nav-toggle .fa-bars'),
		iconOpen: document.querySelector('#js-nav-toggle .fa-times'),

		
			
			doToggle: function(e) {
				e.preventDefault();
				this.iconClosed.classList.toggle('d-none');
				this.iconOpen.classList.toggle('d-inline-block');
				this.nav.classList.toggle('collapse');
			}
    	
	};

	hamburger.navToggle.addEventListener('click', function(e) { hamburger.doToggle(e); });
	
    

}());