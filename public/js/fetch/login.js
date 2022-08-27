$('#submit').click((e) => {
    e.preventDefault();
    let username = $('#user').val();
    let password = $('#pass').val();
    $.ajax({
        type: "POST",
        url: "/api/user/login",
        data: {"username": username, "password": password},
        success: () => {
            window.location.href = '/'
        }
    })
})