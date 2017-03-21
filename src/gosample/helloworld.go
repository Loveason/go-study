// helloworld
package main

import (
	"fmt"
	"strings"
)

type MyStruct struct {
	A string
	B int
}

//匿名组合
type Base struct {
	Name string
}

func (base *Base) Foo() {}

func (base *Base) Bar() {}

type Foo struct {
	*Base
}

func (foo *Foo) Bar() {
	foo.Base.Bar()
}

//接口
type Integer int

func (a Integer) Less(b Integer) bool {
	return a < b
}

func (a *Integer) Add(b Integer) {
	*a += b
}

type LessAdder interface {
	Less(b Integer) bool
	Add(b Integer)
}

func main() {
	//	t := MyStruct{A: "Hello Struct", B: 7}

	//	fmt.Println(t.A)
	//	var a Integer = 1
	//	var b LessAdder = &a
	//	ss := []int{1, 2, 3, 4, 5, 6}
	//	fmt.Println("ss:", ss)
	templateName := "list.html"
	pos := strings.Index(templateName, ".html")
	fmt.Println("pos:", pos)
}
