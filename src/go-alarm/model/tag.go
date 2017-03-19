package model

type Tag struct {
	Id              string
	TagName         string
	TagCategory     string //分类
	TagType         int    //类别.虚拟点、实际点
	Mode            int    //推模式、拉模式
	Collectinterval int    //采集间隔. 推模式为nil
	Collectaddr     string //采集地址. 推模式为nil
	Remark          string
	Alarms          []Alarm //告警信息
}
