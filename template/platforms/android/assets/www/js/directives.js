angular.module('epihack.directives', [])

    .directive('map', function() {
        return {
            restrict: 'E',
            scope: {
                onCreate: '&'
            },
            link: function ($scope, $element, $attr, $http) {
                function initialize() {
                    var mapOptions = {
                        center: new google.maps.LatLng(-22.914746, -43.232467),
                        zoom: 12,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    var hospitals = [{"geometry":{"location":{"lat":-22.891811,"lng":-43.309827}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"176637a9d932be72be5d3562cd1a8af8e246d1c3","name":"Hospital Municipal da Piedade","photos":[{"height":312,"html_attributions":["<a href=\"https://www.google.com/maps/views/profile/101798946371787648119\">hosp Piedade</a>"],"photo_reference":"CmRdAAAA0cFR0fzSygM56RAFmaK6QGdLuAKvweHZaZG1e5ONAXV_WwRNc8hE01JG9b4t4MBI_2N7B4oMbobCpiuu7enYmArAyFxTRroXSgDLK-B1mABYEuXeFrHzt78t5knpOe8eEhBC_v1mqgO4BWK0s0oHuZnVGhTKmd67t5SOopi73DAuiwvassAQCQ","width":575}],"place_id":"ChIJZ1sH6Rd9mQARhpbj0SFmrFE","rating":4.3,"reference":"CnRwAAAA_IEeTzzq0d6gduawdJy2yLkCU4aEFlLxJElbLw48vNTwjRz4Wsef8fn0YdQ7O78K_wCsa2LC8ZPdqeFtTAy-NiVeCKMsxZmZbcxOfTFIgRFpfyeDeYxg-vAimqSGBwtqSrCkXuVZ352ZxFE4pw1CKhIQe2WHK9JhiuFoYUNK49tF9BoUq--MutbiolQCq-LmVsVobkhJFYw","scope":"GOOGLE","types":["hospital","point_of_interest","establishment"],"vicinity":"Rua da Capela, 96 - Piedade, Rio de Janeiro"},{"geometry":{"location":{"lat":-22.915921,"lng":-43.221224}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"10ab920eed14e4e8a90ac4f42b9c6093e946652f","name":"Hospital Universitário Gaffrée e Guinle","place_id":"ChIJfw1kzlB-mQARyh2TDUMsqZw","rating":4.4,"reference":"CoQBfQAAAGUBPq-ltV-zuDHJ7O35zGXXpPxgXZPxc5sfjzN6GNjEVWgGar-lJ5GCgGy-_1gpbvKecA5xIbV7JXVcoK-_FiWuDSkifmsyXoOQ7dF0N509GYhflg1yBQn3ZHMD-F_VAaFcyu-FGZ9DJCPX0ScAqst6PbXtNLmqRpM8ErC9oK2KEhB76ba-ywmD47NfONX6q62-GhRRakuy5bcMNfNzEvB9wz7O6tbCvw","scope":"GOOGLE","types":["hospital","point_of_interest","establishment"],"vicinity":"Rua Mariz e Barros, 775 - Tijuca, Rio de Janeiro"},{"geometry":{"location":{"lat":-22.914746,"lng":-43.232467}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"42d0df803586a681d0b319f0de9bd800205e480d","name":"Hospital Badim","place_id":"ChIJi1LeYV1-mQAR-su-olxkiWk","rating":3.2,"reference":"CnRhAAAANYaUyMj-RkFvQeUQ43vpydJeGUA5c2b-f8a5Twr1UwjHoZWgC1gyuDyakC7xzTH57k381tR1E9EDqfHMs8QLcA3g8O0zBq6qrteEXgYoR-fGOnYPKr5EfLFJRynMh-AtoUVHQsQ6M0vOGIQjQHJ39BIQwTDdkioIrGkOVn0Eb1FwaRoUiRMxP7QQZdpwiWA93go-XQ1wFSw","scope":"GOOGLE","types":["hospital","point_of_interest","establishment"],"vicinity":"Rua São Francisco Xavier, 390 - Tijuca, Rio de Janeiro"},{"geometry":{"location":{"lat":-22.955316,"lng":-43.195632}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/fitness-71.png","id":"1d4408218fb44decc75fab8471e3e1fea2ee4fa2","name":"CREB- Centro Reumatologia Ortopedia Botafogo","opening_hours":{"open_now":true,"weekday_text":[]},"photos":[{"height":556,"html_attributions":["<a href=\"https://www.google.com/maps/views/profile/116110292850822042174\">CREB- Centro Reumatologia Ortopedia Botafogo</a>"],"photo_reference":"CmRdAAAAKGGHEJj3lNcrHPfj5v22bMSwhxRJO2fTGRIYZvjNF3g73PFpIXxARgDbg-L5wNj5jrN5rtd_Gejydrhgsh_84fyU47uF9tyCUNNrlgMlSG9MrYpjVkBtjbg5l-PEDlQ0EhDIBvfdgOD7tLfRoh4mOjehGhReaeCEftJT_GzQrMEQ8Q4UtedRjw","width":556}],"place_id":"ChIJsQh-s99_mQARW83FzTJ-ipQ","rating":3.9,"reference":"CoQBgAAAAEXY1uvLvGxWk1w57eYE7y2uJkJIQY4TBTrJWl9CtLNZVZOS12g1Z9Zkxb5cxY_ZP3UTctDC-OVELi41rU3448rgIjqJE2bErvluvEMeiwKXe-Gwd7BnQCvwOxUfCeX8jyYocd9YXLsrloD5exw8xx6MvYtzF0SITu-3dDWL3bL7EhAcgnQZdACbJwp6BNy2MNOVGhQWuLutk6bKPBk5TjU8X9d8o60oPw","scope":"GOOGLE","types":["physiotherapist","hospital","gym","doctor","dentist","health","point_of_interest","establishment"],"vicinity":"Rua Voluntários da Pátria, 408 - Botafogo, Rio de Janeiro"},{"geometry":{"location":{"lat":-22.904493,"lng":-43.100881}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"8ee00c0e82665bf5386688dfc46aa9354a2f45f5","name":"Hospital de Olhos de Niterói","opening_hours":{"open_now":true,"weekday_text":[]},"place_id":"ChIJp8KG6vmDmQARPI8fVMn7irk","rating":3.9,"reference":"CoQBcQAAAMAbkDbpPEICeGyFvbpLO1MwIFfReVCkyVx6-AyNL0Dr9YuHyaeSQb_IjcgsfiyWb8Yxe0e3jLbdBfDlUvmcjgf-p1dH-C9DkHNZQD8DYmquZQxL4BYOD_ssU9253pEJy82hm4H09VDM6EKyn1twnQNFd3_A2tnIO68bT53Yo4o_EhBoVsw1_kkjC_QTM7wTsanuGhSclnk_q4-yHe55PGxRzZvPoPA61Q","scope":"GOOGLE","types":["hospital","health","point_of_interest","establishment"],"vicinity":"Avenida Sete de Setembro, 221 - Icaraí, Niterói"},{"geometry":{"location":{"lat":-22.958772,"lng":-43.177639}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"fed3376a6fdc6fe2d3d413098e0017fd4f7afaf1","name":"Hospital São Zacharias","place_id":"ChIJ8VX42_5_mQARwfdW1Lqpgq4","rating":4.1,"reference":"CnRrAAAA_Zpd66WXgHOICWZsbVKFX-uP6SgeepjoYLfxduOzrb51VeYN9MWLNLiLNWhxB22Zc1IwRP2ZPCKM2tB4z290Qj70tQfRY0Aou-EDF4hpoWBWZFRTrP6nVG72hvz4ZuM6ebeh8TYOSlx8PXwaXKxyWxIQ_2t9NiSjic9FEPkTL6aNXBoU1igiGCztQUl_XCLdZeuOo9gVK7s","scope":"GOOGLE","types":["hospital","point_of_interest","establishment"],"vicinity":"Rio de Janeiro"},{"geometry":{"location":{"lat":-22.956534,"lng":-43.196254}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"adb3ecb0c4a8a8312d58160b5094d357a3fc9a41","name":"Casa de Saúde Santa Lúcia","opening_hours":{"open_now":true,"weekday_text":[]},"place_id":"ChIJ8Z9_nt9_mQARWs3xi-YQEXM","rating":4.1,"reference":"CnRuAAAAkhhiRPxh2m0m2_LXeqoyMxwghJ8oYuT99pyEZHb_cU2ARUktDwpTnlhopfnezeqMOQ_C0SEn2_pE-D55ZqsuMV7nUCZGx-MBIMm_hxs12SosHW33x2VIXxeJN4qeLjfwHy-GZ3T13J0t1fM7Xe8dHBIQxOxsn-p7VvgaLhbEAO5zVhoUnjkHoWtnEy0f9-WBRpEP60LdelA","scope":"GOOGLE","types":["hospital","health","point_of_interest","establishment"],"vicinity":"Rua Capitão Salomão, 27 - Botafogo, Rio de Janeiro"},{"geometry":{"location":{"lat":-22.899244,"lng":-43.281532}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"56860e0d44d05f559c1ef81f4be45e157f2dc7ed","name":"Hospital Pasteur","photos":[{"height":1024,"html_attributions":["<a href=\"https://www.google.com/maps/views/profile/118388539688846352376\">Sandro Almeida</a>"],"photo_reference":"CmRdAAAA4p8MW2XGeNYZgdkh_FlndToqOl_sgk6nYeaBTJ86hpIsIRs6R1Ehl0DRd305RCh-g3XRjXwwhOD6HXYTHgI-k-LXiT29ZERb3nA3eP9rFLVpQ2NhuI-Gs5GLblFdY0HnEhAD0s5zvBvalUdNlmxKNUv7GhSXA0geqXSJfNdaXGf-TgbaRyQipA","width":768}],"place_id":"ChIJmW6o3a99mQARu-qpDvhaEgE","rating":3.6,"reference":"CnRjAAAAmWAlUAkbQeTmLmfrLbH1-i1zDLreyEruXVfiK5J9SO88bRe8iVo_p2TgnrgkhA4Ojiuh7Zh6p7RvE_JxHgSVHdqWkPhoh9wakM7HDIgzfFf1QYiE1OqT5CT9OUODq1q1dGJI6lYllnLHDEL5rp3GthIQuyMYuztFAqBnAeWmXvyKpxoU_-A0HjyNjmT9GBbUxxfnd3Nyb5M","scope":"GOOGLE","types":["hospital","point_of_interest","establishment"],"vicinity":"Avenida Amaro Cavalcânti, 495 - Méier, Rio de Janeiro"},{"geometry":{"location":{"lat":-22.936786,"lng":-43.190681}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"06848aa7d18ce3865c8461746d2155b039a5b604","name":"Instituto Nacional de Cardiologia","place_id":"ChIJm7BmapR_mQARhRYEYOo3yQY","rating":4.2,"reference":"CoQBdAAAAPWjByzQ6msc8BTCDIfSuP9NOaag2N_AF2yNXdoGZ2Afnl2qfG2oBKrrW1O2wR-NDEwQWiAhK712MmzEcYQQ4Ygt2vl24JqwazIb2rMQ7okLCaGnXnv3dT_5KMeMVx6pEm4YWq4k6lYRWfcNGhXJMVl-oD7zNuaNs7kZH5_yNPtlEhD2BAxror74TGy3QgfG4DBYGhREfkmy9j545PXtBS7ye4H4FFFxXQ","scope":"GOOGLE","types":["hospital","point_of_interest","establishment"],"vicinity":"Rua das Laranjeiras, 374 - Laranjeiras, Rio de Janeiro"},{"geometry":{"location":{"lat":-22.965215,"lng":-43.190373}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"02416c6c6ee521be261db23b6b1597d0445749a1","name":"Hospital Copa D'Or","opening_hours":{"open_now":true,"weekday_text":[]},"photos":[{"height":1224,"html_attributions":["<a href=\"https://www.google.com/maps/views/profile/100516964754193610878\">Marcio Augusto Lacerda</a>"],"photo_reference":"CmRdAAAANgOcyO3_FHvjiFLREpPl9CBYY0NQBpeWAy_qwAWWmOatyCiAklGNiFSb-7c-AO71hW8D7k3092R9rOpQs8yr5gWBl752YJKaoXplrk_MjMrl4d9qugT7TfJ_V92j_CS0EhBPzAxgbEG7i9thLKbxE-yCGhSPAVszVlV9HkuddAmUgB2rlU0bKw","width":1632}],"place_id":"ChIJdxPCbFzVmwARkCszsgss-pE","rating":3.7,"reference":"CnRmAAAAJ-vf5mE0EgcT-Y2MmUC8o7YuA1RaCclAZSyYcU_UxZSNcoCYVPf3kcP5i6vN5uEHpZBpsgLbfgMK4_9XAocjFQWDJxEUeeyKpYnntwRMWJ40GU43sgm-75akkHg4TZGfuieCarWvDGEQ-nzy1qKUdRIQ3j-sabSAK13DmwT-fD84XBoUxwCFDYEF8MMM1kT7gJGJL6huW_w","scope":"GOOGLE","types":["hospital","point_of_interest","establishment"],"vicinity":"Rua Figueiredo de Magalhães, 875 - Copacabana, Rio de Janeiro"},{"geometry":{"location":{"lat":-22.869358,"lng":-43.376154}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"2c463293d10b39a11744231e311128498b0becf8","name":"Casa do Médico","opening_hours":{"open_now":true,"weekday_text":[]},"photos":[{"height":1024,"html_attributions":["<a href=\"https://www.google.com/maps/views/profile/103750888116490621638\">marcela barbosa</a>"],"photo_reference":"CmRdAAAA7ZFuToay4FrQBOLdR6mbnrxFseY_FgT5d5alqm5kKNtMuG5YI95bzYfHs8Ck0drdlCFBiHlcreg9Kc8mv02TKgNQ2VW7KiJrbm1LlyofncR9gSIpztbqUEy9Ej_5M8DqEhDaOq11h8gkrQzg4bF1dgnXGhT5cWh6xwlQlqvwH_ik03GNyiI_ag","width":768}],"place_id":"ChIJ914RjVpimQARshMj-fZ2q74","reference":"CnRjAAAApNMubKUtXSX7Fp5SUqWx4YDkJneYFjveheHHI-C9ZJpzx3r0P6OWPwCHWu2yDXVHQV9Lt2cm5yG5bIKrWYAFBg45UzZPzVJaS3hLqB5VtjaUSKPn7VZJRN_n6HEvZONrFKq5JrejfYkkS5kjoupVHBIQzM_XqSWhlAS7C-RwlmDTYBoU6bXym7Ig_4FEAfrIgZZVyOVPWts","scope":"GOOGLE","types":["store","hospital","health","point_of_interest","establishment"],"vicinity":"Rua General Savaget, 385 - Marechal Hermes, Rio de Janeiro"},{"geometry":{"location":{"lat":-22.915173,"lng":-43.2237}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"8b45697d97a71e28ab4bdd25a8cb150fde4e7533","name":"Hospital Israelita Albert Sabin","place_id":"ChIJKXjhFFp-mQAREKbzNJcMIP4","rating":4.8,"reference":"CoQBcwAAAD_TONlF0Xlalei856-qc_e03mGejW0JLUFuoamt02Wj0q4jSCdLAtUyPDnf8Iy9lv3VXqNzavUHqqWiypo1PQrI2zW7q7_cd93FjBkyUJ1weL6SA2lvM52hnazUvk-eXItdTD2omLATM8FloJvL0OSj_y7CQzzcJuLTR2IqIsNzEhD1Wkl3qwmbPrISRIYJNrDKGhSOeJCCbi2F9reHKnnfolvKvBtRWw","scope":"GOOGLE","types":["hospital","point_of_interest","establishment"],"vicinity":"Rua Professor Gabizo, 319 - Maracanã, Rio de Janeiro"},{"geometry":{"location":{"lat":-22.787682,"lng":-43.313705}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"1240624dba35c55a2c08c921641b948989ab02f5","name":"Casa de Saúde São José - Materno Infantil","place_id":"ChIJYcGYFcF6mQAR8Rm4Y5uSCCI","rating":4.1,"reference":"CoQBfwAAANImr_-LsZPk-SE0v9AHe7NZ4LWcc8_wxXCM_BsUbi0YNb4F8wkVPlsLjhD-Kf7e_MIKz_0Af92vQjOeAC2AOz8ZS99zj00DL23eEgeuywXGc5nViBMFQGgBqZSoZesorLch8c3llipJBoynugIBoUAPgcxySuQfRcJA0_Y4P781EhA20TmTUEOAqBPFcugFJT02GhREogZvTx_hFm9WX0XkT-m-wBSWUg","scope":"GOOGLE","types":["hospital","point_of_interest","establishment"],"vicinity":"Rua Etelvina Chaves, 83 - Centro, Duque de Caxias"},{"geometry":{"location":{"lat":-22.907627,"lng":-43.221523}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"cdf031a84b7a6d8501c093c9124f08e4e01635f9","name":"Hospital Quinta D'Or","photos":[{"height":734,"html_attributions":["<a href=\"https://www.google.com/maps/views/profile/103057666783364520216\">Celso Martinez</a>"],"photo_reference":"CmRdAAAAwMkvzK8GMpX28OvxEqEE1QH8z_4Ddsk49guk4bw2F1RKfvlYyOzp5Gac6zf09qqvDmkzKUyTWD0mPq4jlH782iFc4lkM-7eO3WD4Bo7VzMd67XTK2_OJBVz8C4P9fsAhEhDcJt9Lbe5KQT_P0SW7vrYWGhQgqxcdJpLF0RO1HMdJqd_LkFX4tw","width":990}],"place_id":"ChIJg8Ntuvl-mQAR8S_yuunepRA","rating":4.1,"reference":"CnRnAAAAgOAaOsbm_fSgxwSIf74dqsw8VKyeWVajcp0eqm4RJd-pjsGwkHiCLBjDP1PllD3NQCjob6iGp6C7oZ_d9KlEzXcFseOxj6lG5HLkzIm1_d2710aaUvBZxtnH02pOXAv4d-Br2HgLfWS_uji9BZlxlRIQIdpXzm7I7-OVm7sH8Rc3khoUxmN-W3pu14_TvoHkRH2YpOvmeEE","scope":"GOOGLE","types":["hospital","point_of_interest","establishment"],"vicinity":"Rua Almirante Baltazar, 435 - São Cristovão, Rio de Janeiro"},{"geometry":{"location":{"lat":-22.970712,"lng":-43.186583}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"56855cd0207c30ea7fc8c668a9a0e2c3d967c5ae","name":"Clínica Copacabana Ltda.","opening_hours":{"open_now":true,"weekday_text":[]},"place_id":"ChIJQ7ZyM0XVmwARnysQY2dvsoY","reference":"CnRtAAAAmBaAWZFAj3QYmLoyWGdQ6ECh_2_UN_llbptFRfHZl60aiIszvWcS6J7-gFEAqA4D64A-WfO7Iqmf6UxULbh0U8ITWUqtzCbNhJRzEFWUxwKuUJYBArOlI880QgcNcjY_jm6vP4RH7V69Yg3_LqhPxRIQAY5kdA1bFrUbTKHpTbZy4BoUWvSA5vi346Ep1feGdSx_1SStzfA","scope":"GOOGLE","types":["hospital","point_of_interest","establishment"],"vicinity":"Avenida Nossa Senhora de Copacabana, 664 - Copacabana, Rio de Janeiro"},{"geometry":{"location":{"lat":-22.907529,"lng":-43.17113}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"28158abc181cf2de053714238d1f46d6b785ba58","name":"Hospital Geral","opening_hours":{"open_now":true,"weekday_text":[]},"photos":[{"height":4320,"html_attributions":["<a href=\"https://www.google.com/maps/views/profile/112184969145973543910\">Arthur Junior</a>"],"photo_reference":"CmRdAAAAiXfit_oZuxe05Bk8XdS2eVkMKptn1fiw6fXaLfjzro7DwqdQmjIIPT4bjqMIx54tpXOS08-Kj8Xhq46LnFOW5XhFQNLCtJDSUVxIGTq0AB3U5EfgSfbxLOLPe7TIl8JpEhDopLSNI-Asy-fg8rhraplXGhSN3dT95CjU-hZsXHGssnsUR9bNww","width":2432}],"place_id":"ChIJtyQNn-CBmQARBqULZPIuKtE","rating":4,"reference":"CnRiAAAAS_xjrnI7eT76cQvuQFjtIY0rVCZr7RjGtvzsxIa0PAHGAESfTMwIjg5TyJwd8Gfc3knWGAoMb8ZaPlajR-YTY7zeCX2Trm_YfSQbd0p3UNNLAz2fJJnk5Tfe-i1Njo8fni8nHebJ1kkFzd0sLxzX5BIQ4l0PeCVfJq9LSaouBCkuDRoUNc5EIJD9V5rga9J0j8Jqa7-7E5Y","scope":"GOOGLE","types":["hospital","point_of_interest","establishment"],"vicinity":"Rua Santa Luzia, 206 - Centro, Rio de Janeiro"},{"geometry":{"location":{"lat":-22.838988,"lng":-43.285022}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"4c365aa9ddc14e817915468d9426215fee317361","name":"Hospital Estadual Getúlio Vargas","place_id":"ChIJfd-qnpx7mQARhSr6rmBZ-kY","rating":4,"reference":"CoQBdAAAAA-49bGaZCKt-0P3IsUv0Hpa6090SZcapEcbRMdcbV0vG7FyMXI6gcbq6SPA4an64a0uVOYVvJD3_bmNypDvqDenVhsfrxqW2qynelqc88uBNsAXxd_tqbnwg2DQ6LcBPL7EmMVdmbOi5vub28Pqxj-hUo_mUD4qlFUX36vnA1zmEhCK6vwJwQHpmFIt5dCtZj4sGhS5lfvUVs-jp3GQKARJfrhfscuVhA","scope":"GOOGLE","types":["hospital","point_of_interest","establishment"],"vicinity":"Avenida Lobo Júnior, 2293 - Penha Circular, Rio de Janeiro"},{"geometry":{"location":{"lat":-22.92469,"lng":-43.21142}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"4145985312bb2f22dea12b80c3ca765b3eb48fda","name":"Hospital Casa de Portugal","photos":[{"height":358,"html_attributions":["<a href=\"https://www.google.com/maps/views/profile/112049973604763509759\">Hospital Casa de Portugal</a>"],"photo_reference":"CmRdAAAAC3njWBcb0gzKnmWG_ky1ou8wB6miv904M4hAJHV29TFuZOmNN4NqsBe5x2n5vRy_YGv8hG3IKgN2ZCfy9sA64UdkoFljsMjlRgfJ4fitsApr_63c_qDMJ2W5RoKwFqKQEhCV8Bd6f5HmtH5AC4r0SyRQGhSShq3lnNj3ODaZglnmob0rAub9kQ","width":550}],"place_id":"ChIJ5V0o87J_mQARIX6IdeYCQjA","rating":3.4,"reference":"CnRsAAAAwek4cIq_6zhoXbmRHU5nrzoKwQ0ui7MhiNTubVJiLLEX6zhT2RAhUp3-38QE07NeVCfqZT2o0EpB3xypNCHSrgvRkuc_Tv656zIjGdTGqXxE_itPyU_-qHOKm04iTkGLhCYTwUgkOVH9ixIVm8nKxBIQmeMX_TeucnyhSF-ncIJmkhoUHDAnSOA-lANlEiussIxk3A_BGsE","scope":"GOOGLE","types":["hospital","point_of_interest","establishment"],"vicinity":"Rua do Bispo, 72 - Rio Comprido, Rio de Janeiro"},{"geometry":{"location":{"lat":-22.916351,"lng":-43.215625}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"dab53f934453c1dd692197b6626191a271677615","name":"Hospital São Vicente de Paulo","opening_hours":{"open_now":true,"weekday_text":[]},"photos":[{"height":816,"html_attributions":["<a href=\"https://www.google.com/maps/views/profile/105758583229873213535\">Ana Paula Silva</a>"],"photo_reference":"CmRdAAAAwQlA-GKckC3JIDaItMJOKbuJ7TCN4BS_mYFPcDSX-D-KrnytBR8UtecogPyLMPIXuTF6vNIHTylOs_OJTHEK1BBU0x4zm9F3G8_LiivXRcXVv1XAKQrSllknIWVuwWFzEhAFqGL8WRW6tYzuCbGO59mtGhRzVhUIGo2Mrp3cVouOxFOWLFgpFg","width":459}],"place_id":"ChIJs-tIy1R-mQARnkS-x4TuVP0","rating":3.9,"reference":"CoQBcgAAAI6MBITSq6vlzCEsq_6XU9UmSVOemFYPiZEumOr5QWod4xTtHwGEYpY8Erj8mdAO1DPThpCyr3OdLOjeF6c0x2G-h_L_bp4QgtDY7mQJ8tddqo3zFsd25mVBeDQq0teISVN4GIBMy8tSlYxAC-j2vd0btVVidmMLlmlfICGLMq44EhBGlmJnMzqDBSdR1biHpdjzGhRVZbHoDEh4X-KAB4v6TXGPV0DU3A","scope":"GOOGLE","types":["hospital","point_of_interest","establishment"],"vicinity":"Rua Doutor Satamini, 333 - Tijuca, Rio de Janeiro"},{"geometry":{"location":{"lat":-22.984418,"lng":-43.222624}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png","id":"ab38a10294c62f3e954baad64c5624853c52e1c8","name":"CDPI","opening_hours":{"open_now":true,"weekday_text":[]},"place_id":"ChIJhSFInK3VmwARz9zu6qsK00M","rating":3,"reference":"CmRXAAAA_uEETW44LwUqbLqg3PZuVb5UfYuob6XQzGNooZHRQa7d8gShoHAO4cKOCp7Z587dyzqnhn_dKfL5IvRlHkzWDCk0CBRvkKqChsIIDPmOse5HrifpyasTjp-GkpyHcGecEhDWkio0xTW3sKKfbw9_hs-jGhQi1bYMCOF1PVSOOO-JfVekbzVLCA","scope":"GOOGLE","types":["hospital","doctor","health","point_of_interest","establishment"],"vicinity":"Avenida Ataulfo de Paiva, 669 - Leblon, Rio de Janeiro"}];

                    var map = new google.maps.Map($element[0], mapOptions);
                    var infowindow = new google.maps.InfoWindow();

                    var image = {
                        url: 'http://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png',
                        // This marker is 20 pixels wide by 32 pixels tall.
                        size: new google.maps.Size(32, 32),
                        // The origin for this image is 0,0.
                        origin: new google.maps.Point(0,0),
                        // The anchor for this image is the base of the flagpole at 0,32.
                        anchor: new google.maps.Point(0, 32),
                        scaledSize: new google.maps.Size(20, 20)
                    };
                    for (var i = 0; i < hospitals.length; i++){
                        var hospital = hospitals[i];
                        var myLatLng = new google.maps.LatLng(hospital.geometry.location.lat, hospital.geometry.location.lng);

                        var html_info = '<p><img src='+hospital.icon+'></p><h5>'+hospital.name+'</h5></br><p>'+hospital.vicinity+'</p>';
                        var marker = new google.maps.Marker({
                            position: myLatLng,
                            map: map,
                            icon: image,
                            title: hospital.name,
                            info: html_info,
                            size: new google.maps.Size(120, 110),
                            title: hospital.name
                        });

                        google.maps.event.addListener(marker, 'click', function () {
                            infowindow.setContent(this.info);
                            infowindow.open(map, this);
                        });

                    }
                    $scope.onCreate({map: map});
                    // Stop the side bar from dragging when mousedown/tapdown on the map
                    google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
                        e.preventDefault();
                        return false;
                    });

                }
                if (document.readyState === "complete"){
                    initialize();
                } else {
                    google.maps.event.addDomListener(window, 'load', initialize);
                }
            }
        }
    });