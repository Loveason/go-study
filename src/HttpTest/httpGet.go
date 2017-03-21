// httpGet
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	httpGet()
}

func httpGet() {
	resp, err := http.Get("http://www.baidu.com")
	if err != nil {
		//错误处理
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		//错误处理
	}
	fmt.Println(string(body))
}

func httpPost() {

}
