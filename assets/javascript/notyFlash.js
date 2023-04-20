document.addEventListener('DOMContentLoaded', function() {

    const successMessage = document.body.getAttribute('data-flash-success');
    const errorMessage = document.body.getAttribute('data-flash-error');

    if (successMessage && successMessage.length > 0) {
        new Noty({
            theme: 'relax',
            text: successMessage,
            type: 'success',
            layout: 'topRight',
            timeout: 1500
        }).show();
    }

    if (errorMessage && errorMessage.length > 0) {
        new Noty({
            theme: 'relax',
            text: errorMessage,
            type: 'error',
            layout: 'topRight',
            timeout: 1500
        }).show();
    }
})