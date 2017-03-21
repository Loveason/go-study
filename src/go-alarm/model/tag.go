package model

type Tag struct {
	TagName         string
	TagCategory     string //分类
	TagType         int    //类别.0:实际点;1:主动计算虚拟点、被动计算虚拟点
	Mode            int    //1:推模式;0:拉模式
	CacheNum        int    //实时库缓存数据条数
	ParentName      string //父节点
	Children        []Tag  //子节点
	CollectInterval int    //采集间隔.用于拉模式tag,推模式为nil
	CollectAddr     string //采集地址.用于拉模式tag,推模式为nil
	CalcTrigger     int    //0:不触发;1:触发

	CalcExp              string //计算表达式,虚拟点
	CalcField            string //计算字段,虚拟点
	CalcInterval         int    //计算间隔,仅用于主动计算虚拟点
	CalcAssociationfield string //计算关联字段,虚拟点
	Remark               string
	Alarms               []Alarm   //告警信息
	Data                 []TagData //数据
}

type TagData struct {
	TagName    string `json:'tag_name'`    //tag名
	Timestamp  int64  `json:'timestamp'`   //时间戳
	TagValue   string `json:'tag_value`    //tag数据
	TagExtProp string `json:'tag_ext_prop` //tag扩展属性
}
