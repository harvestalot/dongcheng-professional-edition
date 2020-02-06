<!-- 关于我们 -->
<template>
<div class=''>
    <header id="header" class="top_bord">
		<div class="header content_layout clearfix">
			<a href="http://peking.caupdcloud.com/"><div class="fl logo"><img src="../../static/img/logo-bottom.png" alt=""></div></a>
			<div class="fr nav">
				<a href="http://peking.caupdcloud.com/">首页</a>
				<a href="http://peking.caupdcloud.com/bjculture/#/video">视频资源库</a>
				<a href="http://peking.caupdcloud.com/bjculture/#/document">历史文化保护图文档</a>
			</div>
		</div>
	</header>
	<div class="about_banner"><img src="../../static/img/about-banner.jpg" alt=""></div>
	<section class="content_layout">
		<h2 class="title clearfix">
			<div class="fl title_icon about_us_icon"><img src="../../static/img/about_us.png" alt=""></div>
			<div class="fl title_line"></div>
		</h2>
		<div class="text text_2">
			<p>北京老城保护数字化平台由中国城市规划设计研究院学术信息中心（创新中心）主力研发，聚焦于北京老城历史文化保护与城市体检内容，联合多家机构分期建设，希望通过建设数字化、智能化的公共文化平台，推动公共文化服务供给产品和供给模式创新，以进一步发挥资源整合、线上/下平台的科技引导、文化引擎作用，促进文化科技深度融合与老城跨界共生。</p>
			<p>
				参与平台建设工作的机构还包括：中国城市规划设计研究院城市设计研究分院、中国城市规划设计研究院历史文化名城研究所。
			</p>
		</div>
		<h2 class="title clearfix">
			<div class="fl title_icon cooperative_agencies_icon"><img src="../../static/img/cooperative_agencies.png" alt=""></div>
			<div class="fl title_line"></div>
		</h2>
		<div class="text">
			<p>支持机构：</p>
			<div class="clearfix">
				<div class="fl text_item">
					<span class="potion fl"></span><span class="fl mr_50">中国城市规划学会城乡规划实施学术委员会</span>
				</div>
				<div class="fl text_item">
					<span class="potion fl"></span><span class="fl">北京城市规划学会街区治理与责任规划师工作专委会</span>
				</div>
			</div>
			<div class="clearfix">
				<div class="fl text_item">
					<span class="potion fl"></span>
					<span class="fl mr_50">北京市规划和自然资源委员会东城分局</span>
				</div>
				<div class="fl text_item">
					<span class="potion fl"></span><span class="fl">北京市规划和自然资源委员会西城分局</span>
				</div>
			</div>

			<p class="mt_40">共建机构：</p>
			<div>
				北京林业大学、北京工业大学、北方工业大学、中央美术学院、中央财经大学、北京建筑大学、首都经济贸易大学、中国矿业大学等
			</div>
		</div>
		<h2 class="title clearfix">
			<div class="fl title_icon contact_us_icon"><img src="../../static/img/contact_us.png" alt=""></div>
			<div class="fl title_line"></div>
		</h2>
		<div class="text">
			<p>中国城市规划设计研究院学术信息中心（创新中心）</p>
			<p>电话：010-58323823</p>
			<p>邮箱：ccpd@china-up.com</p>
		</div>
	</section>
	<section class="footer">
		<div class="content_layout">
            <img src="../../static/img/logo-bottom.png" alt="">
			<a href="./about_us.html" class="about_us">关于我们</a>
		</div>
	</section>
</div>
</template>

<script>

export default {
    components: {},
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {
        document.getElementById("views").style["overflow-y"] = "auto";
    },
}
</script>
<style scoped>
    html,body{
        overflow: auto;
    }
    .top_bord{
        border-bottom: 3px solid #f0b33c;
    }
    .header{
        height: 74px;
        background-color: #fff;
    }
    .logo{
        width: 224px;
        height: 34px;
        margin: 20px 0;
    }
    .nav a{
        display: inline-block;
        line-height: 74px;
        margin-right:30px;
        font-size: 14px;
        color: #343434;
    }
    .nav a:hover{
        color: #f0b33c;
    }
    .about_banner{
        width: 100%;
        height: 240px;
        /* background: url("./images/about-banner.jpg") center center no-repeat; */
    }
    .title{
        margin-top: 20px;
        padding: 20px 0;
        font-size: 18px;
    }
    .title_icon{
        width: 240px;
        height: 26px;	
    }
    .about_us_icon{
        /* background:url("./images/about_us.png") center center no-repeat; */
    }
    .cooperative_agencies_icon{
        /* background:url("./images/cooperative_agencies.png") center center no-repeat; */
    }
    .contact_us_icon{
        /* background:url("./images/contact_us.png") center center no-repeat; */
    }
    .title_line{
        width: 800px;
        height: 1px;
        margin: 15px 0 15px 20px;
        background-color: #000;
    }
    .text{
        line-height: 2;
        color: #343434;
        font-size: 16px;
        text-align:justify; 
        text-justify:inter-ideograph;
    }
    .text_2{
        text-indent: 2em;
    }
    .potion{
        width: 10px;
        height: 10px;
        margin: 10px 10px 10px 0; 
        background-color: #000;
        border-radius: 10px;
    }
    .text_item{
        min-width: 400px;
    }
    .mt_40{
        margin-top: 40px;
    }
    .mr_50{
        margin-right: 50px;
    }
    .footer{
        position: relative;
        height: 8%;
        margin-top: 30px;
        border-top: 3px solid #f0b33c;
    }
    .footer img{
        margin: 0.7% 50px;
    }
    .about_us{
        position: absolute;
        right: 50px;
        top: 50%;
        width: 120px;
        height: 26px;
        line-height: 26px;
        margin-top: -13px;
        text-align: center;
        font-size: 14px;
        border: 1px solid #666;
        color: #666;
    }
    .about_us:hover{
        border: 1px solid #f0b33c;
        color: #f0b33c;
    }
</style>