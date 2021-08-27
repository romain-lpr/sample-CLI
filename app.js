#!/usr/bin/env node

const args = getCMD(process.argv.slice(2))
const data = require('./data').data
let cmd = args._[0] || 'help'
switch (cmd) {
  case 'filter':
    filter(args)
  break;
  case 'count':
    count()
    break
  default:
    console.error(`${cmd} is not a valid command!`)
    break;
}

function getCMD(commandArray){
  const args = {
    _:[]
  }
  for(let command of commandArray){
    const regexCommandLong = new RegExp('--')
    if(regexCommandLong.test(command)){
      command = command.slice(2).split('=')
      args._.push(command[0])
      if(command[1]){
        args[command[0]] = command[1]
      }
    } else{
      args._.push(command)
    }
  }
  return args
}

function filter(args){
  const filterExpression = new RegExp(args.filter)
  data.forEach(country => {
    country.people.forEach(people => {
      people.animals = people.animals.filter(x => filterExpression.test(x.name))
    })
    country.people = country.people.filter(x => x.animals[0])
  })
  const returnData = data.filter(x => x.people[0])
  if(returnData[0]){
    console.log(JSON.stringify(returnData,null,2))
  }
}

function count(){
  data.forEach(country => {
    country.name += `[${country.people.length}]`
    country.people.forEach(people => {
      people.name += `[${people.animals.length}]`
    })
  })
  console.log(JSON.stringify(data,null,' '))
}