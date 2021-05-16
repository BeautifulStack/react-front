import React from 'react'
import PropTypes from 'prop-types'

export const Table = ({ objects }) => {
  if (!objects || objects.length === 0) return <div>Nothing to Display</div>
  const labels = Object.keys(objects[0])
  return (
    <table className="TableCustom">
      <thead>
        <tr>
          {labels.map((name, i) => (
            <th key={i}>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {objects.map((object, i) => {
          return (
            <tr className="table-line" key={i}>
              {labels.map((label, i) => {
                if (typeof object[label] === 'object') {
                  object[label] = object[label] ? object[label] : 'None'
                  return (
                    <td
                      key={i}
                      title={Object.entries(object[label]).reduce(
                        (acc, [key, value]) => {
                          acc += `${key}: ${value}\n`
                          return acc
                        },
                        ''
                      )}
                    >
                      Hover Me
                    </td>
                  )
                } else {
                  return <td key={i}>{object[label]}</td>
                }
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

Table.propTypes = {
  objects: PropTypes.array,
}
