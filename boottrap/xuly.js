let app = new Vue({
    el: '#app',
    data: {
        charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toUpperCase(),
        plaintext: '',
        teams:[
            'Trần Văn Sáng',
            'Đặng Bá Lộc',
            'Trương Minh Hải',
            'Trần Phước Mỹ Toàn',
            'Phạm Thị Thùy',
            'Trần Văn Thìn',
        ],
        on_teams:false,
        result: JSON.parse(localStorage.getItem("result")) || [],
        Regex: /^([A-Za-z0-9|\s])*$/,
        mess: 'Đầu vào chỉ được chứa các kí  tự không dấu và các chữ số',
        show_mess:false,
    },
    methods: {
        key: function () {
            return this.charset.split('').sort(function () {
                return 0.5 - Math.random()
            }).join('')
        },
        encrypt: function (plaintext) {
            let key = this.key();
            let result = '';
            for (let a of plaintext.toUpperCase()) {
                    if (key.includes(a)) {
                    result += key[this.charset.indexOf(a)];
                }
            }
            return {'encrypt': result, 'key': key};
        },
        decrypt: function (key, secret) {
            let result = '';
            for (let a of secret.toUpperCase()) {
                if (key.includes(a)) {
                    result += this.charset[key.indexOf(a)];
                }
            }
            return result;
        },
        main: function () {
            let text = this.plaintext;
            if (this.Regex.test(text) && text !== "") {
                this.show_mess = false;
                let enc = this.encrypt(text);
                let plaintext = this.decrypt(enc.key, enc.encrypt);
                this.plaintext = '';
                this.result.unshift({'key': enc.key, 'secret': enc.encrypt, 'plaintext_': plaintext});
                if (this.result.length > 15) {
                    this.result.pop();
                }
                localStorage.setItem("result", JSON.stringify(this.result));
            }else{
                this.show_mess = true;
            }
        },
   }
});