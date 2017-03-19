// tcpserver
package main

import (
	"io"
	"log"
	"net"
)

func handleClient(conn net.Conn) {
	defer conn.Close()
	buf := make([]byte, 512)
	for {
		log.Print("server: conn: waiting")
		n, err := conn.Read(buf)

		if err != nil { //读取为空,EOF异常

			if err != io.EOF { //err 不是读取为空的错误
				log.Printf("server: conn: read: %s", err)
			}

			break
		}

		log.Printf("server: conn: echo %q\n", string(buf[:n]))
		n, err = conn.Write(buf[:n]) //服务端回写
		log.Printf("server: conn: wrote %d bytes", n)

		if err != nil {
			log.Printf("server: write: %s", err)
			break
		}
	}
	log.Println("server: conn: closed")
}

func main() {
	service := "127.0.0.1:8000"
	listener, err := net.Listen("tcp", service)
	if err != nil {
		log.Fatalf("server: listen: %s", err)
	}

	log.Print("server: listening")

	for {
		conn, err := listener.Accept()
		if err != nil {
			log.Printf("server: accept: %s", err)
			break
		}
		log.Printf("server: accepted from %s", conn.RemoteAddr())
		go handleClient(conn)
	}
}
