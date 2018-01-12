<template>
    <div id="foot">
        <div class="content">
            <el-row>
                <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="center">
                    <a href=""><img src="../../assets/logo-foot.png" alt="footlogo"></a>
                </el-col>
                <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" style="text-align:center">
                    <div class="msg">
                        <p>关于我们|加入我们|意见反馈|APP下载</p>
                        <p>All Rights Reserved 滇ICP备15001166号</p>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="right">
                    <div class="connectus">
                        <span>关注我们:</span>
                        <icon-svg iconClass="weibo"></icon-svg>
                        <icon-svg iconClass="wechat"></icon-svg>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="line"></div>
        <div class="link center">
            <span>友情链接：</span>
            <a href="">夏徛荣考研</a>
            <a href="">百度</a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    #foot{
        background-color: #515151;
        color:#fff;
        padding:20px 0;
        .content{
            margin: 0 auto;
            max-width: 1200px;
            padding: 35px 0;

            .right{
                text-align: right;
            }
        }
        .line{
            height: 1px;
            width: 100%;
            background: #666;
        }
        .link{
            margin: 0 auto;
            max-width: 1200px;
            padding-top: 20px;
        }
    }
    @media (max-width: 800px){
        .center{
            text-align:center;
        }

        #foot .content .right{
            text-align:center;
        }
    }
</style>

