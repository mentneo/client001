// Handle iframe loading errors
document.addEventListener('DOMContentLoaded', function() {
    const iframes = document.querySelectorAll('iframe');
    
    iframes.forEach(iframe => {
        iframe.onerror = function() {
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'iframe-fallback';
            fallback.innerHTML = '<p>Content could not be loaded</p>';
            this.parentNode.insertBefore(fallback, this.nextSibling);
        };
        
        iframe.onload = function() {
            try {
                // Check if iframe loaded correctly
                const iframeDoc = this.contentDocument || this.contentWindow.document;
                if (!iframeDoc) {
                    this.onerror();
                }
            } catch(e) {
                // Cross-origin issues might trigger this
                console.log('Iframe loaded, but content cannot be inspected due to cross-origin policy');
            }
        };
    });
});
