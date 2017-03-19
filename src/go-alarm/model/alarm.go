package model

type Alarm struct {
	Alarmlevel   int              //级别
	Alarmchannel int              //告警渠道
	Contacts     []Contact        //告警联系人
	Conditions   []Alarmcondition //告警条件
}

type Contact struct {
	Username string
	Mobile   string
	Email    string
	Qq       string
	Wechart  string
	Remark   string
}

type Alarmcondition struct {
	ConditionExp string //表达式
	Threshold    string //阈值
}
