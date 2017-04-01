// databasetest
package main

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/go-sql-driver/mysql"
	_ "github.com/mattn/go-sqlite3"
)

type MyModel struct {
	Id   int
	Name string
}

func main() {
	mysqltest1()
}

func mysqltest1() {
	db, err := sql.Open("mysql", "test:test@tcp(10.100.40.43:3306)/test?charset=utf8")
	defer db.Close()
	checkErr(err)
	var m MyModel
	mlist := make([]MyModel, 0)
	rows := db.Query(`select * from mysql_test`)
	for rows.Next() {
		err = rows.Scans(&m.Id, &m.Name)
		if err != nil {
			fmt.Println("err:", err)
		}
		mlist = append(mlist, m)
	}
}

func mysqltest() {
	db, err := sql.Open("mysql", "root:root@/test?charset=utf8")
	defer db.Close()

	checkErr(err)

	//插入
	stmt, err := db.Prepare("INSERT userinfo SET username=?,departname=?,created=?")
	checkErr(err)

	res, err := stmt.Exec("loveason", "交通事业部", "2017-03-04")
	checkErr(err)

	id, err := res.LastInsertId()
	checkErr(err)

	fmt.Println(id)

	//更新
	stmt, err = db.Prepare("update userinfo set username=? where uid=?")
	checkErr(err)

	res, err = stmt.Exec("loveasonupdate", id)
	checkErr(err)

	affect, err := res.RowsAffected()
	checkErr(err)

	fmt.Println(affect)

	//查询数据
	rows, err := db.Query("SELECT * FROM userinfo")
	checkErr(err)

	for rows.Next() {
		var uid int
		var username, departname, created string
		err = rows.Scan(&uid, &username, &departname, &created)
		checkErr(err)
		fmt.Println("uid:", uid, "username:", username, "departname:", departname, "created:", created)
	}

	//删除数据
	stmt, err = db.Prepare("delete from userinfo where uid=?")
	checkErr(err)

	res, err = stmt.Exec(id)
	checkErr(err)

	affect, err = res.RowsAffected()
	checkErr(err)

	fmt.Println(affect)
}

func sqlitetest() {
	db, err := sql.Open("sqlite3", "./test.db")
	defer db.Close()

	checkErr(err)

	//插入
	stmt, err := db.Prepare("INSERT INTO userinfo(username,departname,created) values(?,?,?)")
	checkErr(err)

	res, err := stmt.Exec("loveason", "交通事业部", "2017-03-04")
	checkErr(err)

	id, err := res.LastInsertId()
	checkErr(err)

	fmt.Println(id)

	//更新
	stmt, err = db.Prepare("update userinfo set username=? where uid=?")
	checkErr(err)

	res, err = stmt.Exec("loveasonupdate", id)
	checkErr(err)

	affect, err := res.RowsAffected()

	fmt.Println(affect)

	//查询
	rows, err := db.Query("select * from userinfo")
	checkErr(err)

	for rows.Next() {
		var uid int
		var username, departname string
		var created time.Time
		err = rows.Scan(&uid, &username, &departname, &created)
		checkErr(err)
		fmt.Println("uid:", uid, "username:", username, "departname:", departname, "created:", created)
	}

	//删除
	stmt, err = db.Prepare("delete from userinfo where uid=?")
	checkErr(err)

	res, err = stmt.Exec(id)
	checkErr(err)

	affect, err = res.RowsAffected()
	checkErr(err)

	fmt.Println(affect)
}

func checkErr(err error) {
	if err != nil {
		fmt.Println("err:", err)
		panic(err)
	}
}
