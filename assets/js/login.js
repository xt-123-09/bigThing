window.onload = function() {
    // 获取  去注册  点击 去注册   隐藏登录  显示注册
    var dl = document.querySelector('.login');
    var zc = document.querySelector('.reg');
    var goReset = document.querySelector('.goReset');
    var goLogin = document.querySelector('.goLogin');


    goReset.onclick = function() {
        console.log(111);
        dl.style.display = "none";
        zc.style.display = "block";

    }

    goLogin.onclick = function() {
        console.log(22);
        zc.style.display = "none";
        dl.style.display = "block";

    }


    // 注册
    // 获取按钮 级输入框
    var user = document.querySelector('#user');
    var pwd = document.querySelector('#pwd');
    var repwd = document.querySelector('#repwd');
    var zhuce = document.querySelector('#zhuce');

    var userReg = /^[0-9A-Za-z]{3}$/;
    var pwdReg = /^[a-zA-Z0-9]{6,8}$/;

    // 点击注册的时候 判断正则
    zhuce.onclick = function(e) {
        // alert(0987)

        e.preventDefault();
        if (pwd.value !== repwd.value) {
            layer.msg('两次密码不一致', { icon: 4 });
        } else if (userReg.test(user.value) === false) {
            console.log("错误");
            layer.msg('账号是字母数字任意位数', { icon: 5 });
        } else if (pwdReg.test(pwd.value) === false) {
            console.log("错误");
            layer.msg('密码必须是6-12位的大小写字母数字', { icon: 5 });
        } else if (userReg.test(user.value) && pwdReg.test(pwd.value)) {
            console.log('正确');


            // 请求注册接口验证 (用jquery的ajax)
            $.ajax({
                type: 'POST',
                url: 'http://ajax.frontend.itheima.net/api/reguser',
                data: {
                    username: user.value,
                    password: pwd.value
                },
                success: function(res) {


                    if (res.status !== 0) {
                        layer.msg('注册失败', { icon: 4 });
                        return false
                    } else {
                        console.log(res);
                        layer.msg('注册成功,去登陆吧', { icon: 1 });
                        //模拟点击
                        goLogin.click();
                    }

                }
            })
        }
    }



    // 登录
    var d_user = document.querySelector('#d_user');
    var d_pwd = document.querySelector('#d_pwd');
    var denglu = document.querySelector('#denglu');

    // 点击登录的时候 判断正则
    denglu.onclick = function(e) {
        // alert(0987)

        e.preventDefault();
        if (userReg.test(d_user.value) && pwdReg.test(d_pwd.value)) {
            console.log('正确');
            // 请求登录接口验证 (用jquery的ajax)
            $.ajax({
                type: 'POST',
                url: 'http://ajax.frontend.itheima.net/api/login',
                data: {
                    username: d_user.value,
                    password: d_pwd.value
                },
                success: function(res) {
                    if (res.status !== 0) {
                        layer.msg('登录失败', { icon: 4 });
                        // return false
                    } else {
                        console.log(res);
                        layer.msg('登录成功', { icon: 1 });
                        // location.href = "/index.html"

                        // 将得到的taoken字符串存在本地储存
                        localStorage.setItem('token', res.token)
                    }

                }
            })


        } else if (userReg.test(d_user.value) === false) {
            console.log("错误");
            layer.msg('账号是字母数字任意位数', { icon: 5 });

        } else if (pwdReg.test(d_pwd.value) === false) {
            console.log("错误");
            layer.msg('密码必须是6-12位的大小写字母数字', { icon: 5 });
        }
    }

}