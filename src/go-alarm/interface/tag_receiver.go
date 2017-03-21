// tag_receiver
// 接收外部推过来的tag点数据
package main

import (
	"fmt"
	"go-alarm/model"
	"log"
	"net/http"
	"os"
	"regexp"
	"runtime/debug"
	"time"
)

func main() {
	if len(os.Args) > 0 {
		if matched, _ := regexp.MatchString(`^\d{2,4}$`, os.Args[0]); !matched {
			fmt.Println("端口号需为2-4位长度.")
			return
		}
	}

	http.ListenAndServe(":" + os.Args[0])
}

func safeHandler(fn http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if e, ok := recover().(error); ok {
				http.Error(w, e.Error(), http.StatusInternalServerError)
				log.Println("WARN: panic in %v. - %v", fn, e)
				log.Println(string(debug.Stack()))
			}
		}()

		fn(w, r)
	}
}

func handleReceiveTag(w http.ResponseWriter, r *http.Request) {
	tag_name := r.FormValue("tag_name")
	tag_val := r.FormValue("tag_val")
	tag_ext_prop := r.FormValue("tag_ext_prop")

	d := &model.TagData{TagName: tag_name, TagValue: tag_val, TagExtProp: tag_ext_prop, Timestamp: time.Now().Unix()}
	//入队列
}
