var urlDefault = "";
$(document).ready(function () {
    if (window.name == "") {
        window.name = "0";
    }
    $(".mnChat").click(function () {
        closeChat();
    });
    //$("#mnChatMobile").click(function () {
    //    closeChat();
    //});
    //===========================================================
    $(".sendChat").click(function () {
        var event_arg = $(this).attr("event-arg");
        if (event_arg == "1") {
            sendChat();
        }
    });
    //===========================================================
    $('.inputChat').keyup(function (e) {
        if (e.keyCode == 13) {
            sendChat();
        }
    });
    //===========================================================
    $('#emailGuest').keyup(function (e) {
        if (e.keyCode == 13) {
            checkBeforeChat();
        }
    });
    //===========================================================
    $(".title-review-message").click(function () {
        var attrDisplay = $(".content-review-message").css('display');
        var attSrc = $(this).children("img").attr("src");
        if (attrDisplay == "none") {
            $(".content-review-message").css("display", "block");
            $(this).children("img").attr("src", attSrc.replace("up", "down"));
        } else {
            $(".content-review-message").css("display", "none");
            $(this).children("img").attr("src", attSrc.replace("down", "up"));
        }
    });

    /*Max min chat*/
    $('#maxChat').click(function () {
        var src = $(this).attr("src");
        if (src.indexOf('max') > 0) {
            $(this).attr("src", src.replace("max", "min"));
            //
            $('.box-chat').css("width", "700px");
            $('.box-chat').css("height", "460px");
            //
            $('#contentchat').css("width", "688px");
            $('#contentchat').css("height", "310px");
            $('.inputChat').css("width", "627px");
        } else {
            $(this).attr("src", src.replace("min", "max"));
            $('.box-chat').css("width", "285px");
            $('.box-chat').css("height", "390px");
            //
            $('#contentchat').css("width", "273px");
            $('#contentchat').css("height", "246px");
            $('.inputChat').css("width", "212px");

        }
    })
    //===========================================================
    $(".button-chat").click(function () {
        //
        var event_arg = $(this).attr("event-arg");
        //=================== Action Rate Employee =======================
        if (event_arg == "3") {
            $("#sendRate").css("display", "block");
            $("#sendRateFinish").css("display", "none");
            showRate();
            //Show max min
            $('#maxChat').css("display", "none");
            $('.box-chat').css("width", "285px");
            $('.box-chat').css("height", "390px");
            //
            $('#contentchat').css("width", "273px");
            $('#contentchat').css("height", "246px");
            $('.inputChat').css("width", "212px");
            //
        }
            //=================== Action Finish Chat =======================
        else if (event_arg == "4") {
            //Show max min
            $('#maxChat').css("display", "none");
            $('.box-chat').css("width", "285px");
            $('.box-chat').css("height", "390px");
            //
            $('#contentchat').css("width", "273px");
            $('#contentchat').css("height", "246px");
            $('.inputChat').css("width", "212px");
            //
            if (isSent == '0') {
                $("#sendRateFinish").css("display", "block");
                $("#sendRate").css("display", "none");
                showRate();
            } else {
                actionFinish();
            }
        }
            //=================== Action Back Step 1(Show List Employee) =======================
        else if (event_arg == "1") {
            $(".box-chat").fadeOut(400, function () {
                $(".box-list-chat").slideDown(600);
            });
        }
            //=================== Action Start Chat =======================
        else if (event_arg == "0") {
            checkBeforeChat();

        }
            //=================== Action Review Message =======================
        else if (event_arg == "5") {
            var nGuest = $.trim($("#nameGuestMessage").val());
            var mailGuest = $.trim($("#emailGuestMessage").val());
            var phoneG = $.trim($("#phoneGuestMessage").val());
            var contentG = $.trim($("#contentGuestMessage").val());
            if (!validateEmailChat(mailGuest)) {
                alert("Email không hợp lệ");
            }
            if (!validatePhoneChat(phoneG)) {
                alert("Số điện thoại không hợp lệ");
            }
            else if (nGuest != "" && mailGuest != "" && phoneG != "" && contentG != "") {
                nameGuest = encodeURIComponent(nGuest);
                emailGuest = mailGuest;
                phoneGuest = phoneG;
                content = contentG;
                loadListChat(8);
                alert("Cảm ơn " + nGuest + " đã để lại lời nhắn, Mắt Bão sẽ phản hồi lại trong vòng 24h.");
                $("#nameGuestMessage").val("");
                $("#emailGuestMessage").val("");
                $("#phoneGuestMessage").val("");
                $("#contentGuestMessage").val("");
                //$(".content-review-message").css("display", "none");
                var hListChat = $(".box-chat-container").height();
                $(".box-chat-container").animate({ bottom: -hListChat }, 400);
                var attSrc = $(".title-review-message").children("img").attr("src");
                $(".title-review-message").children("img").attr("src", attSrc.replace("down", "up"));
            }
            else {
                alert("Vui lòng nhập đầy đủ thông tin của bạn!");
            }
        }
    });
    //======================= Action Button Send Rate ====================================
    $("#sendRate").click(function () {
        isSent = "0";
        var isShow = sendRate(5);
        if (isShow) {
            $(".content-input-rate").fadeOut(300, function () {
                $(".content-input-chat").fadeIn(300);
                $(".box-chat").stop().animate({ height: 390 }, 300, function () {
                    $('#maxChat').css("display", "block");
                    $('#maxChat').attr("src", "/App_Themes/MatbaoNet/img/maxChat.PNG");
                });
            });
            isSent = '1';
            //Show max min
            //var showmaxmincss = $('.content-input-chat').css("display");
            //if (showmaxmincss == "block") {
            //    $('#maxChat').css("display", "block");
            //}
            
        }
    });
    //====================== Action Button Send Rate When Finish Chat ===================
    $("#sendRateFinish").click(function () {
        actionFinish();
    });
    //=======================
    var obj = $("#dragChat");
    obj.on('dragenter', function (e) {
        e.stopPropagation();
        e.preventDefault();
        obj.css({ "display": "block" });
    });
    obj.on('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });
    obj.on('drop', function (e) {
        obj.css({ "display": "none" });
        if (uname != "") {
            e.preventDefault();
            var files = e.originalEvent.dataTransfer.files;
            //console.log(files);
            handleFileUpload(files, obj);
        } else {
            alert("Vui lòng chọn nhân viên Kinh doanh cần gửi tập tin.");
        }
    });
    $(document).on('dragenter', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });
    $(document).on('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
        obj.css({ "display": "block" });
    });
    $(document).on('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });
});

function checkBeforeChat() {
    var nGuest = $.trim($("#nameGuest").val());
    var mailGuest = $.trim($("#emailGuest").val());
    if (!validateEmailChat(mailGuest)) {
        alert("Email không hợp lệ");
    }
    else if (nGuest != "" && mailGuest != "") {
        nameGuest = encodeURIComponent(nGuest);
        emailGuest = mailGuest;
        loadContentChat(false);
        //show max min
        var showmaxmincss = $('.content-input-chat').css("display");
        if (showmaxmincss == "block") {
            $('#maxChat').css("display", "block");
        }
    }
    else {
        alert("Vui lòng nhập đầy đủ thông tin của bạn!");
    }
}
var nameEncode = "";
function loadChat(data_arg) {
    //console.log(data_arg);
    if (data_arg.indexOf('*') > 0) {        
        uname = data_arg.split('*')[0];
        nameEncode = data_arg.split('*')[1];
        fname = encodeURIComponent(data_arg.split('*')[1]);
        dept = encodeURIComponent(data_arg.split('*')[2]);
        idDept = data_arg.split('*')[3];
        uGuest = data_arg.split('*')[4];
        nameGuest = encodeURIComponent(data_arg.split('*')[5]);
        emailGuest = data_arg.split('*')[6];
        curDate = data_arg.split('*')[7];
        $(".content-input-name").css("display", "none");
        $(".title-chat .hiddenChat").addClass("showChat");
        $(".content-input-chat").css("display", "block");
        flagCheckReply = 1;
        checkStatusSales();
        loadContentChat(true);
        loadListChat(100);
        $(".box-chat").slideDown(600);
    } else {
        uGuest = data_arg.split('$')[0];
        curDate = data_arg.split('$')[1];
        loadListChat(0);
    }
}
function actionFinish() {
    var isShow = sendRate(6);
    if (isShow) {
        setDefault();
    }
}
function validatePhoneChat(phone) {
    var phoneReg = /^\d+$/;
    if (!phoneReg.test(phone)) {
        return false;
    } else {
        return true;
    }
}

function validateEmailChat(email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if (!emailReg.test(email)) {
        return false;
    } else {
        return true;
    }
}

function showRate() {
    $(".rate-name-sale").text(decodeURIComponent(fname));
    $(".content-input-chat").fadeOut(300, function () {
        $(".content-input-rate").fadeIn(300);
        $(".box-chat").stop().animate({ height: 215 }, 300);
    });
}

function sendRate(type) {
    if ($("input[name='rateSale']:checked").length > 0) {
        rate = $("input[name='rateSale']:checked").val();
        content = encodeURIComponent($("#inputRate").val());
        if (rate != 0) {
            var maxlength = content.length;
            if (maxlength > 100) {
                maxlength = 100;
            }
            content = content.substring(0, maxlength);
            loadListChat(type);
            return true;
        }
        else {
            var maxlength = content.length;
            if (maxlength > 0) {
                if (maxlength > 100) {
                    maxlength = 100;
                }
                content = content.substring(0, maxlength);
                loadListChat(type);
                return true;
            } else {
                alert("Vui lòng gửi lý do bạn đánh giá nhân viên không tốt!");
                return false;
            }
        }

    } else {
        alert("Vui lòng chọn đánh giá cho Nhân viên!");
        return false;
    }
}

var flagCheckReply = 0;
function sendChat() {
    var send = $.trim($("#inputChat").val());
    if (send != "") {
        $("#inputChat").val("");
        var maxlength = send.length;
        if (maxlength > 100) {
            maxlength = 100;
        }
        send = send.substring(0, maxlength);
        content = encodeURIComponent(send);
        loadListChat(2);
    } else {
        alert('Vui lòng nhập nội dung cần gửi');
    }
}
var interval; var count = 0;
//============= Check Status Employee Reply Guest during 40s =================================
function checkStatusSales() {
    interval = self.setInterval(function () { checkStatus() }, 2000);
    function checkStatus() {
        count++;
        $.ajax({
            url: urlDefault + "/Chat1.ashx?type=3&un=" + uname + "&fname=" + fname + "&dept=" + dept + "&idDept=" + idDept + "&uGuest=" + encodeURIComponent(uGuest) + "&date=" + curDate + "&nameGuest=" + nameGuest + "&emailGuest=" + emailGuest,
            cache: false,
            dataType: "text",
            beforeSend: function () { },
            success: function (req) {
                if (req == "true") {
                    checkChatingSale();
                    $(".title-chat .hiddenChat").addClass("showChat");
                    interval = window.clearInterval(interval); count = 0;
                } else {
                    if (count == 20) {
                        $.ajax({
                            url: urlDefault + "/Chat1.ashx?type=4&un=" + uname + "&fname=" + fname + "&dept=" + dept + "&idDept=" + idDept + "&uGuest=" + encodeURIComponent(uGuest) + "&date=" + curDate + "&nameGuest=" + nameGuest + "&emailGuest=" + emailGuest,
                            cache: false,
                            dataType: "text",
                            beforeSend: function () { },
                            success: function (req) {
                                if (req == "endtime") {
                                    $(".box-list-chat").css("display", "none");
                                    $(".review-message").css("display", "block");
                                    return false;
                                }
                                if (req != "endtime" && req != "") {
                                    count = 0;
                                    interval = window.clearInterval(interval);
                                    uname = req.split('_')[0];
                                    fname = encodeURIComponent(req.split('_')[1]);
                                    dept = encodeURIComponent(req.split('_')[2]);
                                    idDept = req.split('_')[3];
                                    loadContentChat(true);
                                    interval = self.setInterval(function () { checkStatus() }, 2000);
                                }
                                if (req == "") {
                                    count = 0;
                                    interval = window.clearInterval(interval);
                                    interval = self.setInterval(function () { checkStatus() }, 2000);
                                }
                            }
                        }).fail(function (a, b, c, d) {
                            //alert(a + b + c + d + "asd");
                        });
                    }
                }
            }
        }).fail(function (a, b, c, d) {
            //alert(a + b + c + d + "asd");
        });
    }
}


function checkChatingSale() {
    var itvChating = self.setInterval(function () {
        $.ajax({
            url: urlDefault + "/Chat1.ashx?type=7&un=" + uname + "&fname=" + fname + "&dept=" + dept + "&idDept=" + idDept + "&uGuest=" + encodeURIComponent(uGuest) + "&date=" + curDate + "&nameGuest=" + nameGuest + "&emailGuest=" + emailGuest,
            cache: false,
            dataType: "text",
            beforeSend: function () { },
            success: function (req) {
                if (req != "" && req != "error") {
                    fname = req.split('@')[1];
                    uname = req.split('@')[0];
                    dept = req.split('@')[2];
                    idDept = req.split('@')[3];
                    loadContentChat(true);
                }
            }
        }).fail(function (a, b, c, d) {
        });
    }, 3000);

}

function loadListChat(type) {
    var url = urlDefault + "/Chat1.ashx?type=" + (type == 83 || type == 84 || type == 100 ? 0 : type) + "&un=" + uname + "&fname=" + fname + "&dept=" + dept + "&rate=" + rate + "&content=" + content + "&uGuest=" + encodeURIComponent(uGuest) + "&idDept=" + (type == 100 ? 0 : idDept) + "&isSent=" + isSent + "&nameGuest=" + nameGuest + "&emailGuest=" + emailGuest + "&date=" + curDate + "&phoneGuest=" + phoneGuest;
    $.ajax({
        url: url,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            if (type == 83) {
                $(".box-list-chat ul li.BrandHCM").html("<div class='loadingChat'></div>");
            }
            if (type == 84) {
                $(".box-list-chat ul li.BrandHN").html("<div class='loadingChat'></div>");
            }
        },
        success: function (req) {
            console.log(type);
            if (req == "endtime") {
                $(".box-list-chat").css("display", "none");
                $(".review-message").css("display", "block");//trilm khoa
                return false;
            }
            else if ((type == 0 || type == 100) && req != "error") {
                $(".box-list-chat ul").append(req);
                if (type == 0 && req != "") {
                    if (window.name == "1" || window.name == "") {
                        $(".box-list-chat").slideDown(800);
                    }
                    else {
                        var hListChat = $(".box-list-chat").height(); //- 29;
                        $(".box-list-chat").css({ "display": "block", "bottom": -hListChat });
                        var src = $(".box-list-chat #closelist").attr("src");
                        $(".box-list-chat #closelist").attr("src", src.replace("down", "up"));
                        $(".box-list-chat #closelist").attr("data-arg", "1");
                    }
                }
                eventChat();
            }
            else if (type == 83 && req != "error") {
                $(".box-list-chat ul li.BrandHCM").html(req);
            }
            else if (type == 84 && req != "error") {
                $(".box-list-chat ul li.BrandHN").html(req);
            } else if (type == 1 || type == 2) {
                if (req != "" && req != "noGInfo" && req != "error") {
                    uGuest = req;
                    count = 0; interval = window.clearInterval(interval);
                    alert("Thông tin của bạn bị thiếu");
                    showInputInfo(); return;
                }
                else if (req == "noGInfo") {
                    count = 0; interval = window.clearInterval(interval);
                    alert("Bạn chưa điền đầy đủ thông tin");
                    showInputInfo(); return;
                }
                if (flagCheckReply == 0 && type == 2) {
                    flagCheckReply = 1;
                    checkStatusSales();
                }
                $("#inputChat").val("");
                $(".content-input-name").fadeOut(600, function () {
                    $(".content-input-chat").fadeIn(600);
                });

                //show max min
                var maxheight = $('.box-chat').css("height");
                console.log("maxheight : " + maxheight);
                if (maxheight == "460px") {
                    $(".box-chat").stop().animate({ height: 460 }, 600);
                } else {
                    $(".box-chat").stop().animate({ height: 390 }, 600);
                }

            }
            else if (type == 6 && req != "error" && req != "") {
                uGuest = req;
                $(".box-chat").fadeOut(300, function () {
                    $(".box-list-chat").slideDown(600);
                });
            }
        }
    }).fail(function (a, b, c, d) {
        //alert(a + b + c + d + "asd");
    });
}

function showInputInfo() {
    $(".content-input-chat").fadeOut(600, function () {
        $(".content-input-name").fadeIn(600);
    });
    $(".box-chat").stop().animate({ height: 238 }, 600);
    flagCheckReply = 0;
}
//================== Load Content Chat  =================================
function loadContentChat(isLoad) {
    var srcImg = "https://onlineerm.matbao.net/Images.ashx?ThumbSize=86&ImagePath=%2fUpload%2fPERIMAGES&ImageName=" + uname + ".jpg&Def=%2fWeb%2fImgs%2fnophoto_avatar.jpg";
    $(".curSale").html("<b>" + decodeURIComponent(fname) + "</b>");
    $(".imgSale").attr("style", "background:url(" + srcImg + ") no-repeat center center");
    if (!isLoad) {
        loadListChat(1);
    }
    var srcContent = "https://chat.matbao.net/CustomerChat.aspx?uGuest=" + decodeURIComponent(uGuest) + "&uUser=" + uname + "&curDate=" + curDate + "&nUser=" + fname + "&nGuest=" + nameGuest + "&isWebSale=1";
    $("#contentchat").attr("src", srcContent);
    var obj = $("#dragChat");
    $(".wrap-send-chat img").click(function () {
        $(this).parent().find('input[type="file"]').trigger('click');
    });

    $('input[type=file]').change(function () {
        var files = this.files;
        handleFileUpload(files, obj);
    });
}
//================== Event Close  =================================
function eventChat() {
    $("#closeBoxChat").click(function () {
        var data_arg = $(this).attr("data-arg");
        var src = $(this).attr("src");
        var h = $(".box-chat").height();
        if (data_arg == "0") {
            //show max min
            $('#maxChat').css("display", "none");
            //
            $(".box-chat").animate({ bottom: -h }, 400);
            $(this).attr("src", src.replace("down", "up"));
            $(this).attr("data-arg", "1");

        } else {
            $(".box-chat").animate({ bottom: '0px' }, 400);
            $(this).attr("src", src.replace("up", "down"));
            $(this).attr("data-arg", "0");
            //show max min
            var showmaxmincss = $('.content-input-chat').css("display");
            if (showmaxmincss == "block") {
                $('#maxChat').css("display", "block");
            }
            //

        }
    });
    $("#closelist").click(function () {
        closeChat();
    });
}

function closeChat() {
    
    var data_arg = $("#closelist").attr("data-arg");
    var src = $("#closelist").attr("src");
    var hListChat = $(".box-chat-container").height();
    if (data_arg == "0") {
        //$(".review-message").css("display", "block");// trilm thêm
        $(".box-chat-container").animate({ bottom: -hListChat }, 400);
        $(".box-chat").animate({ bottom: -$(".box-chat").height() }, 400);
        $("#closelist").attr("src", src.replace("down", "up"));
        $("#closelist").attr("data-arg", "1");
        window.name = "0";
    } else {
        
        $(".box-chat-container").animate({ bottom: '0px' }, 400);
        $(".box-chat").animate({ bottom: '0px' }, 400);
        $("#closelist").attr("src", src.replace("up", "down"));
        $("#closelist").attr("data-arg", "0");
        window.name = "1";
    }
}

//================== Action when click Choose Employee or Not Choose Employee  =================================
function buttonChat(ctrl, iDept, data_arg, event_arg) {
    idDept = iDept;
    if (event_arg == "0") {
        var brand = 84;
        var $this = $(".box-list-chat ul li.BrandHN");
        if (iDept == "3") {
            brand = 83;
            $this = $(".box-list-chat ul li.BrandHCM");
        }
        $this.children("div").fadeOut(400, function () {
            loadListChat(brand);
        });
    }
    if (event_arg == "1") {
        uname = data_arg.split('_')[0];
        fname = encodeURIComponent(data_arg.split('_')[1]);
        dept = encodeURIComponent(data_arg.split('_')[2]);
        idDept = iDept;
        var srcImg = "https://onlineerm.matbao.net/Images.ashx?ThumbSize=86&ImagePath=%2fUpload%2fPERIMAGES&ImageName=" + uname + ".jpg&Def=%2fWeb%2fImgs%2fnophoto_avatar.jpg";
        $(".curSale").html("<b>" + decodeURIComponent(fname) + "</b>");
        $(".imgSale").attr("style", "background:url(" + srcImg + ") no-repeat center center");
        if (nameGuest != "" && emailGuest != "") {
            $(".content-input-name").css("display", "none");
            $(".content-input-chat").css("display", "block");
            //$(".title-chat .hiddenChat").addClass("showChat");
            loadContentChat(false);
            //show max min
            var showmaxmincss = $('.content-input-chat').css("display");
            if (showmaxmincss == "block") {
                $('#maxChat').css("display", "block");
            }

        }
        $(".box-list-chat").fadeOut(400, function () {
            $(".box-chat").slideDown(600);
        });

    }
}
//====================== Return Default For All Form Chat ====================
function setDefault() {
    $(".title-chat .hiddenChat").removeClass("showChat");
    $(".content-input-name").removeAttr("style");
    $(".content-input-chat").removeAttr("style");
    $(".content-input-rate").removeAttr("style");
    $(".box-chat").removeAttr("style");
    $("#sendRate").css("display", "none");
    $("#sendRateFinish").css("display", "none");
    isSent = '0'; flagCheckReply = 0;
}
var rate = "0"; var uname = ""; var fname = ""; var dept = ""; var idDept = ""; uGuest = ""; var nameGuest = ""; var emailGuest = ""; var phoneGuest = "";
var curDate = ""; var isSent = "0";
var content = "";

//-=====================================

function sendFileToServer(formData, status) {
    var uploadURL = "https://chat.matbao.net/AjaxFileTranfer.ashx"; //Upload URL
    var extraData = {}; //Extra Data.
    var jqXHR = $.ajax({
        xhr: function () {
            var xhrobj = $.ajaxSettings.xhr();
            if (xhrobj.upload) {
                xhrobj.upload.addEventListener('progress', function (event) {
                    var percent = 0;
                    var position = event.loaded || event.position;
                    var total = event.total;
                    if (event.lengthComputable) {
                        percent = Math.ceil(position / total * 100);
                    }
                    status.setProgress(percent);
                }, false);
            }
            return xhrobj;
        },
        url: uploadURL,
        type: "POST",
        contentType: false,
        processData: false,
        cache: false,
        data: formData,
        success: function (data) {
            status.setProgress(100);
        }
    });

    status.setAbort(jqXHR);
}
var arrHeightStatus = new Array(); var botStatusBar = 386;
function createStatusbar(obj, rowCount, isFail, nameFileTranfer) {
    this.statusbar = $("<div class='statusbar' id='sb-" + rowCount + "'></div>");
    this.filename = $("<div class='filename'><b>File: </b></div>").appendTo(this.statusbar);
    this.size = ""; // $("<div class='filesize'></div>").appendTo(this.statusbar);
    this.progressBar = $("<div class='progressBar'><div></div></div>").appendTo(this.statusbar);
    this.progressError = $("<div class='progressError'><div></div></div>").appendTo(this.statusbar);
    this.abort = $("<div class='abort'></div>").appendTo(this.statusbar);
    this.countDownFile = $("<div class='count-down-file'></div>").appendTo(this.statusbar);
    $(".box-chat").after(this.statusbar);
    this.setFileNameSize = function (name, size) {
        var sizeStr = "";
        var sizeKB = size / 1024;
        if (parseInt(sizeKB) > 1024) {
            var sizeMB = sizeKB / 1024;
            sizeStr = sizeMB.toFixed(2) + " MB";
        }
        else {
            sizeStr = sizeKB.toFixed(2) + " KB";
        }

        this.filename.append(name);
        //this.size.html(sizeStr);
    }

    var hStatusBar = 51;
    if (isFail == 0) {
        this.progressError.hide();
        this.setProgress = function (progress) {
            var progressBarWidth = progress * this.progressBar.width() / 100;
            this.progressBar.find('div').animate({ width: progressBarWidth }, 10); //.html(progress + "% ");
            if (parseInt(progress) >= 100) {
                this.abort.hide();
                this.countDownFile.show();
                hideStatus();
            }
        }
    } else {
        this.abort.hide();
        this.progressBar.hide();
        this.progressError.html("Không thể upload. File phải " + (isFail == 1 ? "nhỏ hơn 5mb." : "có định dạng: .jpg/.jpeg/.jpe/.bmp/.gif/.png/ <br>.txt/.doc/.docx/.xls/.xlsx/.rar/.pdf/.zip") + "");
        hStatusBar = (isFail == 1 ? 56 : 84);
        this.countDownFile.show();
        hideStatus();
    }
    var ctemp = ((rowCount - 1) <= 0 ? 0 : (rowCount - 1));
    arrHeightStatus[rowCount] = hStatusBar;
    botStatusBar = botStatusBar + (rowCount == 0 ? 0 : arrHeightStatus[ctemp]) + 10;
    this.statusbar.css({ "bottom": botStatusBar });
    this.setAbort = function (jqxhr) {
        var sb = this.statusbar;
        this.abort.click(function () {
            jqxhr.abort();
            sb.hide();
        });
    }

    function hideStatus() {
        setTimeout(function () {
            $("#sb-" + rowCount + "").fadeOut(400, function () {
                $("#sb-" + rowCount + "").remove();
            });
        }, 3000);
        //        var countFileOut = 0;
        //        var int_countdown_file = setInterval(function () {
        //            var ctemp = (3 - countFileOut);
        //            $("#sb-" + rowCount + " .count-down-file").html(ctemp);
        //            if (ctemp <= 0) {
        //                $("#sb-" + rowCount + "").fadeOut(400, function () {
        //                    $("#sb-" + rowCount + "").remove();
        //                });
        //                clearInterval(int_countdown_file);
        //            } else {
        //                countFileOut++;
        //            }
        //        }, 1000);
    }
}


function handleFileUpload(files, obj) {
    if (files.length <= 4) {
        botStatusBar = 386; arrHeightStatus = new Array();
        for (var i = 0; i < files.length; i++) {
            var isFail = 0;
            if (files[i].size > (5000 * 1024)) {
                isFail = 1;
            }
            if (!openFile(files[i].name)) {
                isFail = 2;
            }
            var status = new createStatusbar(obj, i, isFail, files[i].name); //Using this we can set progress.
            if (isFail == 0) {
                var fd = new FormData();
                fd.append('file', files[i]);
                status.setFileNameSize(files[i].name, files[i].size);
                fd.append("uGuest", uGuest);
                fd.append("uUser", uname);
                fd.append("curDate", curDate);
                fd.append("brand", "");
                fd.append("nUser", decodeURIComponent(fname));
                fd.append("nGuest", nameGuest);
                fd.append("emailGuest", emailGuest);
                sendFileToServer(fd, status);
            }
        }
    }
    else {
        alert("Vui lòng gửi tối đa 4 tập tin!");
    }
}
function OffShowMinMaxChat() {
    $('#maxChat').css("display", "none");
    $('.box-chat').css("width", "285px");
    $('.box-chat').css("height", "385px");
    //
    $('#contentchat').css("width", "273px");
    $('#contentchat').css("height", "246px");
    $('.inputChat').css("width", "212px");
}
function openFile(file) {
    var extension = file.substr((file.lastIndexOf('.') + 1));
    extension = extension.toLowerCase();
    switch (extension) {
        case 'txt': break;
        case 'jpg': break;
        case 'jpeg': break;
        case 'jpe': break;
        case 'png': break;
        case 'bmp': break;
        case 'gif': break;
        case 'zip': break;
        case 'rar': break;
        case 'doc': break;
        case 'docx': break;
        case 'xls': break;
        case 'xlsx': break;
        case 'pdf': break;
        default:
            return false;
    }
    return true;
};