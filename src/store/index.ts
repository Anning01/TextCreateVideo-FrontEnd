// 中转站 汇总所有的模块来使用
import HomeModule from "./Modules/HomeModule";
import SectionModule from "./Modules/sectionModule";
import tagsModule from "./Modules/tagsModule";

export default function(){
  return {
    home: HomeModule(), // 调用方法得到 channels 对象
    section: SectionModule(), // 调用方法得到 channels 对象
    tags: tagsModule(), // 调用方法得到 channels 对象
  }
}
