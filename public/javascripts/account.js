(function(){
    const $login = $('#login');
    const $loginBtn = $('#loginBtn');
    const $logout = $('#logout');
    const $register = $('#register');
    const $registerBtn = $('#registerBtn');
    const $registerCb = $('#registerCb');
    const $registerPolicyMsg = $('#registerPolicyMsg');
    const $welcomeUser = $('#welcomeUser');
    const $messageModal = $('#messageModal');
    const $loginModal = $('#loginModal');
    const $registerModal = $('#registerModal');
    const $forgetPasswordModal = $('#forgetPasswordModal');
    const $verificationModal = $('#verificationModal');
    const $recoverPasswordModal = $('#recoverPasswordModal');

    const $forgetPasswordBtn = $('#forgetPasswordBtn');
    const $forgetPasswordSendMailBtn = $('#forgetPasswordSendMailBtn');
    const $verificationBtn = $('#verificationBtn');
    const $recoverPasswordBtn = $('#recoverPasswordBtn');

    $loginBtn.on('click', (e) => {
        e.preventDefault();
        $login.hide();
        $register.hide();
        $logout.show();
        $welcomeUser.show()

        document.loginForm.Name.value = "";
        document.loginForm.Password.value = "";
    })

    $logout.on('click', (e) => {
        e.preventDefault();
        setTimeout(()=>{
            $login.show();
            $register.show();
            $logout.hide();
            $welcomeUser.hide();
        }, 200);
    });

    $welcomeUser.on('click', (e) => {
        //e.preventDefault();
    });

    $registerBtn.on('click', (e) => {
        e.preventDefault();
        if ($registerCb[0].checked){
            $messageModal.find('h5.modal-title').text("Đăng ký thành công");
            $messageModal.modal('show');
            $registerModal.modal('hide');
            document.registerForm.reset();
        }
        else {
            $registerPolicyMsg.show();
        }

    });

    $registerCb.on('click', (e) => {
        if (e.target.checked)
            $registerPolicyMsg.hide();
        else
            $registerPolicyMsg.show();
    })

    $forgetPasswordBtn.on('click', (e) => {
        e.preventDefault();
            $loginModal.modal('hide');
    })

    $forgetPasswordSendMailBtn.on('click', (e) => {
        e.preventDefault();
        if (document.forgetPasswordForm.email.value !== ""){
            $verificationModal.modal('show');
            $forgetPasswordModal.modal('hide');
        }

    })

    $verificationBtn.on('click', (e) => {
        e.preventDefault();
        if (document.verificationForm.code.value !== ""){
            $recoverPasswordModal.modal('show');
            $verificationModal.modal('hide');
        }

    })

    $recoverPasswordBtn.on('click', (e) => {
        e.preventDefault();
        const pw = document.recoverPasswordForm.Password.value;
        const confirmPw = document.recoverPasswordForm.ConfirmPassword.value;
        if (pw !== "" && confirmPw !== "" && pw === confirmPw){
            $messageModal.find('h5.modal-title').text("Khôi phục mật khẩu thành công");
            $messageModal.modal('show');
            $recoverPasswordModal.modal('hide');

            document.forgetPasswordForm.reset();
            document.verificationForm.reset();
            document.recoverPasswordForm.reset();
        }
    })
})();