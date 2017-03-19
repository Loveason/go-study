// regextest
package main

import (
	"fmt"
	//	"io/ioutil"
	//	"os"
	//	"net/http"
	"regexp"
	//	"strings"
)

func IsIP(ip string) (b bool) {
	if m, _ := regexp.MatchString("^[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}$", ip); !m {
		return false
	}
	return true
	if m, _ := regexp.MatchString("^[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}$", ip); !m {
		return false
	}
	return true
}

func main() {
	//*******
	//	str := "123.332.123.123"
	//	result := IsIP(str)
	//	fmt.Println("is ip:", result)

	//*******
	//	if len(os.Args) == 1 {
	//		fmt.Println("Usage: regexp [string]")
	//		os.Exit(1)
	//	} else if m, _ := regexp.MatchString("^[0-9]+$", os.Args[1]); m {
	//		fmt.Println("数字")
	//	} else {
	//		fmt.Println("不是数字")
	//	}

	//*******
	//	resp, err := http.Get("http://www.baidu.com")
	//	if err != nil {
	//		fmt.Println("http get error.")
	//	}

	//	defer resp.Body.Close()
	//	body, err := ioutil.ReadAll(resp.Body)
	//	if err != nil {
	//		fmt.Println("http read error")
	//		return
	//	}

	//	src := string(body)

	//	//将HTML标签全转换成小写
	//	re, _ := regexp.Compile("\\<[\\S\\s]+?\\>")
	//	src = re.ReplaceAllStringFunc(src, strings.ToLower)

	//	//去除STYLE
	//	re, _ = regexp.Compile("\\<style[\\S\\s]+?\\</style\\>")
	//	src = re.ReplaceAllString(src, "")

	//	//去除SCRIPT
	//	re, _ = regexp.Compile("\\<script[\\S\\s]+?\\</script\\>")
	//	src = re.ReplaceAllString(src, "")

	//	//去除所有尖括号内的HTML代码，并换成换行符
	//	re, _ = regexp.Compile("\\<[\\S\\s]+?\\>")
	//	src = re.ReplaceAllString(src, "\n")

	//	//去除连续的换行符
	//	re, _ = regexp.Compile("\\s{2,}")
	//	src = re.ReplaceAllString(src, "\n")

	//	fmt.Println(strings.TrimSpace(src))

	//*******
	str := "aa09aaa88aaaa17bb"
	re, _ := regexp.Compile("[a-z]{2,4}")

	//Find 查找第一个匹配
	one := re.Find([]byte(str))
	fmt.Println("Find:", string(one))
	//FindAll
	all := re.FindAll([]byte(str), -1)
	fmt.Println("FindAll:")
	for idx, val := range all {
		fmt.Println("val:", string(val), "idx:", idx)
	}
	//FindIndex 第一个匹配的下标起止位置
	index := re.FindIndex([]byte(str))
	fmt.Println("FindIndex:", index)

	//FindAllIndex
	allindex := re.FindAllIndex([]byte(str), -1)
	fmt.Println("FindAllIndex:", allindex)
	for _, v := range allindex {
		fmt.Println("result:", str[v[0]:v[1]])
	}

	//FindSubmatch
	str = "I am learning Go language"
	re2, _ := regexp.Compile("am(.*)lang(.*)")
	submatch := re2.FindSubmatch([]byte(str))
	fmt.Println("FindSubmatch:", submatch)
	for _, v := range submatch {
		fmt.Println(string(v))
	}
}
