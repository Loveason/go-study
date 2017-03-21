package ipc

import (
	"testing"
)

type EchoServer struct {
}

func (server *EchoServer) Handle(method, params string) *Response {
	code := "UTF8"
	body := "METHOD:" + method + ",PARAMS:" + params
	return &Response{code, body}
}

func (server *EchoServer) Name() string {
	return "EchoServer"
}

func TestIpc(t *testing.T) {
	server := NewIpcServer(&EchoServer{})
	client1 := NewIpcClient(server)
	client2 := NewIpcClient(server)

	resp1, _ := client1.Call("GET", "From Client1")
	resp2, _ := client2.Call("POST", "From Client2")

	if resp1.Body != "METHOD:GET,PARAMS:From Client1" || resp1.Code != "UTF8" ||
		resp2.Body != "METHOD:POST,PARAMS:From Client2" || resp2.Code != "UTF8" {
		t.Error("IpcClient.Call failed.resp1:", resp1, "resp2:", resp2)
	}
	client1.Close()
	client2.Close()
}
