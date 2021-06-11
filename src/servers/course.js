import course from '../api/course'
import reqFunc from '../utils/axios';
const courseServices = {
  selCourse: params => {
    return reqFunc.post(course.selCourse, params);
  },
  addCourse: params => {
    return reqFunc.post(course.addCourse, params);
  },
  delCourse: params => {
    return reqFunc.delete(course.delCourse,params)
  },
  pageOption: params => {
    return reqFunc.post(course.pageOption,params)
  },
  updatCourse: params => {
    return reqFunc.put(course.updatCourse,params)
  }
};
export default courseServices;