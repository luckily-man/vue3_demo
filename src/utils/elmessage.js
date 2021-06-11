import { ElMessage } from 'element-plus'
let msg=null;
const message=(options)=>{
    if(msg){
        msg.close()
    }
    msg=ElMessage(options)
}

export default message;