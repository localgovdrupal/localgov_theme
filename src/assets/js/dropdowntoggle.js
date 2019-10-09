// Main navigation dropdown toggle (PURE JS)
(function() {

	var dropdown = {
		dropToggle: document.querySelector('#js-drop-toggle'),
        drop: document.querySelector('#drop-purejs'),
        chevron: document.querySelector('.dropdown-icon'),
        
		doToggleDrop: function(e) {
			e.preventDefault();
			this.dropToggle.classList.toggle('dummy');
            this.drop.classList.toggle('show');
			this.chevron.classList.toggle('rotate-180');
			this.drop.focus();
            
		}
	};

	//dropdown.dropToggle.addEventListener('click', function(e) { dropdown.doToggleDrop(e); });
	//dropdown.dropToggle.addEventListener('focus', function(e) { dropdown.doToggleDrop(e); }, true);
	//dropdown.dropToggle.addEventListener('blur', function(e) { dropdown.doToggleDrop(e); }, true);
	  
}());


