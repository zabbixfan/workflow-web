<template>
    <div class="panel">
        <panel-title title="Onekit工程申请"></panel-title>
        <div class="panel-body">
        <div class="form-box" style="width: 50%" v-if="formShow">
          <el-alert
            style="margin-bottom: 30px;"
            title=""
            type="info"
            description="填写创建onekit工程所需信息，审核后将会自动创建同名git仓库及指定域名，如不需要域名请不要填写"
            show-icon>
          </el-alert>
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <el-form-item label="工单主题" prop="name">
                    <el-input v-model="form.name" placeholder="工单相关描述"></el-input>
                </el-form-item>
                <el-form-item label="工程名称" prop="projectName">
                    <el-input v-model="form.projectName" placeholder="Onekit工程名"></el-input>
                </el-form-item>
                <el-form-item label="工程组" prop="projectGroupName">
                    <el-select v-model="form.projectGroupName" placeholder="工程组">
                        <el-option key="ggfw" label="公共服务" value="公共服务"></el-option>
                        <el-option key="fcxg" label="房产销冠" value="房产销冠"></el-option>
                        <el-option key="xgjj" label="销冠经纪" value="销冠经纪"></el-option>
                        <el-option key="xggj" label="销冠管家" value="销冠管家"></el-option>
                        <el-option key="xgjf" label="销冠金服" value="销冠金服"></el-option>
                        <el-option key="jyyy" label="交易运营" value="交易运营"></el-option>
                        <el-option key="sjzx" label="数据中心" value="数据中心"></el-option>
                        <el-option key="club" label="CLUB" value="CLUB"></el-option>
                        <el-option key="xgq" label="销冠圈" value="销冠圈"></el-option>
                        <el-option key="bdkb" label="博达看板" value="博达看板"></el-option>
                        <el-option key="dsj" label="大数据" value="大数据"></el-option>
                        <el-option key="ops" label="DevOps" value="DevOps"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工程类型" prop="projectType">
                    <el-select v-model="form.projectType" placeholder="请选择工程类型">
                        <el-option label="Java（War）项目" value="Java:War"></el-option>
                        <el-option label="Java（Jar）项目" value="Java:Jar"></el-option>
                        <el-option label="Web 前端项目" value="FrontEnd"></el-option>
                        <el-option label="Android" value="Android"></el-option>
                        <el-option label="IOS" value="IOS"></el-option>
                        <el-option label=".Net 项目" value="DotNet"></el-option>
                        <el-option label="Python（Flask）项目" value="Python:Flask"></el-option>
                        <el-option label="其他" value="Other"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="负责人" prop="owner">
                    <user-select v-model="form.owner"></user-select>
                </el-form-item>
                <el-form-item label="正式域名" prop="domainName">
                    <el-col :span="12">
                        <el-input v-model="form.domainName" placeholder="无需域名此处留空">
                            <template slot="append">.apitops.com</template>
                        </el-input>
                    </el-col>

                </el-form-item>
                <el-form-item label="工程描述">
                    <el-input type="textarea" v-model="form.projectDescription" placeholder="工程简单描述，中文名称等"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button  type="primary" v-if="submitShow()" @click="onSubmit('form')">提交</el-button>
                    <el-button  type="success" v-if="auditShow()" @click="dialogFormVisible = true">审核</el-button>
                    <el-button  @click="onCancel">取消</el-button>
                </el-form-item>
            </el-form>
                <el-dialog :visible.sync="dialogFormVisible">
                  <el-form :model="auditForm">
                    <el-form-item label="审核结果" >
                      <el-select v-model="auditForm.status" placeholder="请选择审核结果">
                        <el-option label="通过" value="Approve"></el-option>
                        <el-option label="驳回" value="Refuse"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="audit">确 定</el-button>
                  </div>
                </el-dialog>
        </div>
        </div>
        <bottom-tool-bar></bottom-tool-bar>
    </div>
</template>

<script>
    import panelTitle from '../../../components/panelTitle'
    import mainContent from '../../../components/mainContent'
    import bottomToolBar from '../../../components/bottomToolBar'
    import UserSelect from '../../../components/userSelect'
    import * as http from '../../../http.js'
    import api from '../../../api'
    import {
        mapGetters
    } from 'vuex'
    export default {
        data() {
            return {
                dialogFormVisible: false,
                formLabelWidth: '50px',
                id: this.$route.params.id,
                status: '',
                form: {
                    name: '',
                    projectName: '',
                    projectGroupName: '',
                    projectType: '',
                    owner: '',
                    projectDescription: '',
                    domainName: ''
                },
                auditForm: {
                    status: 'Approve'
                },
                rules: {
                    name: [{ required: true, message: '请输入工单主题', trigger: 'blur' }],
                    projectName: [{ required: true, message: '请输入工程名称', trigger: 'blur' }],
                    projectGroupName: [{ required: true, message: '请选择工程组', trigger: 'change' }],
                    projectType: [{ required: true, message: '请选择工程类型', trigger: 'change' }],
                    owner: [{ required: true, message: '请输入负责人', trigger: 'blur' }]
                }
            }
        },
        components: {
            panelTitle,
            mainContent,
            bottomToolBar,
            UserSelect
        },
        computed: {
            ...mapGetters(['userRole']),
            formShow: function () {
                var index = this.$route.path.indexOf('/ticketlist')
                if (index === -1) {
                    return true
                } else if (this.form.name && index === 0) {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let requestBody = {
                                'name': this.form.name,
                                'ticketType': 'createProject',
                                'status': 'Apply',
                                'data': this.form
                            }
                        if (this.id) {
                            http.put(api.Ticket(this.id), requestBody).then(data => {
                                this.$message.success('提交成功！')
                                this.onCancel()
                            })
                        } else {
                            http.post(api.Tickets, requestBody).then(data => {
                                this.$message.success('提交成功！')
                                this.onCancel()
                            })
                        }

                    } else {
                        return false
                    }
                })
            },
            onCancel() {
                this.$router.push({
                    path: '/ticketlist'
                })
            },
            getTicketInfo() {
                http.fetch(api.Ticket(this.id)).then(data => {
                    this.form.name = data.data.data.name
                    this.form.projectName = data.data.data.projectName
                    this.form.projectGroupName = data.data.data.projectGroupName
                    this.form.projectType = data.data.data.projectType
                    this.form.owner = data.data.data.owner
                    this.form.domainName = data.data.data.domainName
                    this.form.projectDescription = data.data.data.projectDescription
                    this.status = data.data.status
                })
            },
            auditShow() {
                var index = this.$route.path.indexOf('/ticketlist')
                if (this.userRole === 'admin' && index === 0 && this.status !== 'Complete') {
                    return true
                } else {
                    return false
                }
            },
            submitShow() {
                if (this.status === '' || this.status === 'Apply' || this.status === 'Refuse') {
                    return true
                } else {
                    return false
                }
            },
            audit() {
                this.dialogFormVisible = false
                let requestBody = {
                    'id': this.id,
                    'status': this.auditForm.status
                }
                http.put(api.Tickets, requestBody).then(data => {
                    this.$message.success('审核成功！')
                    this.onCancel()
                })
            }
        },
        created() {
            if (Boolean(this.id) === true) {
                  this.getTicketInfo()
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
