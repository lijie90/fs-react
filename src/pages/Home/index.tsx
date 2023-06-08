import { Button } from 'antd'
import { useMemo, useState } from 'react'

export default function Home() {
  //可删除列和行的table
  const [tableData, setTableData] = useState<any>([
    {
      id: 1,
      name: '张三',
      age: 18,
      address: '北京市朝阳区',
      isDelete: false
    },
    {
      id: 2,
      name: '李四',
      age: 19,
      address: '北京市海淀区',
      isDelete: false
    },
    {
      id: 3,
      name: '王五',
      age: 20,
      address: '北京市丰台区',
      isDelete: false
    }
  ])
  const [tableHead, setTableHead] = useState([
    {
      id: 4,
      name: '姓名',
      isDelete: false,
      fieldName: 'name'
    },
    {
      id: 5,
      name: '年龄',
      isDelete: false,
      fieldName: 'age'
    },
    {
      id: 6,
      name: '地址',
      isDelete: false,
      fieldName: 'address'
    }
  ])
  const tableMemo = useMemo(() => {
    const newTableData = tableData.map((item: any) => {
      const newTableColum = tableHead.map((i: any) => {
        return <td key={i.id}>{item[i.fieldName]}</td>
      })
      return newTableColum
    })
    return newTableData
  }, [tableData, tableHead])
  //选中表头，出现删除按钮
  const tableHeadClick = (item: any) => {
    const newTableHead = tableHead.map((i) => {
      if (i.id === item.id) {
        i.isDelete = !i.isDelete
      }
      return i
    })
    setTableHead(newTableHead)
  }
  //删除列
  const deleteColumn = (_e: any, item: any) => {
    _e.stopPropagation()
    setTableHead((pre) => {
      const newTableHead = pre.filter((i) => i.id !== item.id)
      console.log(newTableHead)
      return newTableHead
    })
  }
  return (
    <div>
      {/* <table>
        <thead>
          <tr>
            {tableHead.map((item) => {
              return (
                <th
                  key={item.id}
                  onClick={() => tableHeadClick(item)}
                  style={{ position: 'relative' }}
                >
                  {item.name}
                  <button
                    style={{
                      display: item.isDelete ? 'block' : 'none',
                      position: 'absolute',
                      right: '0',
                      top: '-50px'
                    }}
                    onClick={(e) => deleteColumn(e, item)}
                  >
                    删除
                  </button>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {tableMemo.map((item: any, index: number) => {
            return <tr key={index}>{item}</tr>
          })}
        </tbody>
      </table> */}
      {/* <Button></Button> */}
    </div>
  )
}
