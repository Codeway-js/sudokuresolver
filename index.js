module.exports = (tab, nonchar = "a") => {
  let grille = tab
  const poscase = [
      [0, 0], [3, 0], [6, 0],
      [3, 0], [3, 3], [6, 3],
      [6, 0], [6, 3], [6, 6]
  ]
  let lvert = [[], [], [], [], [], [], [], [], []]

  let cases = [[], [], [], [], [], [], [], [], []]
  const charnone = nonchar
  for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
          lvert[j][i] = grille[i][j]
          let modi = i % 3
          let modj = j % 3
          let divi = (i - modi) / 3
          let divj = (j - modj) / 3
          let numcase = divi * 3 + divj
          let pos = modi * 3 + modj
          cases[numcase][pos] = grille[i][j]

      }
  }
  let num = 10
  let functionn = false
  function sim(arr) {
      let r = []
      for (let i = 0; i < arr.length; i++) {
          r.push(arr[i])
      }
      return r
  }
  function legthligne(arr) {
      let result = 0
      arr.forEach(el => {
          if (el != charnone) result++
      })
      return result
  }
  function completeligne(arr) {
      let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      let result = {
          pos: undefined,
          num: undefined
      }
      for (let i = 0; i < 9; i++) {
          if (arr[i] != charnone) {
              nums.splice(nums.findIndex(el => el == arr[i]), 1)
          }
          else {
              result['pos'] = i
          }
      }
      result['num'] = nums[0]
      return result
  }
  function completelignedersolution(arr) {
      let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      let result = {
          pos: [],
          num: []
      }
      for (let i = 0; i < 9; i++) {
          if (arr[i] != charnone) {
              nums.splice(nums.findIndex(el => el == arr[i]), 1)
          }
          else {
              result['pos'].push(i)
          }
      }
      result['num'] = nums
      return result
  }
  Array.prototype.cases = function () {
      return legthligne(this)
  }
  Array.prototype.caseds = function () {
      let result = 0
      for (let i = 0; i < 9; i++) {
          result += legthligne(this[i])
      }
      return result
  }
  // console.log(completeligne(grille[3]))
  // console.log(grille.caseds())
  while (grille.caseds() < 81) {
      if (functionn || num === 10) {
          functionn = false
          if (num == 10) num = 1
          // for initoalisation
          for (let i = 0; i < 9; i++) {
              // the methode is: have a number searching for all the case if we can add and changing number 
              if (!cases[i].find(el => el == num)) {
                  // search just in case who have numbers
                  let imposible = cases[i]
                  for (let y = 0; y > 3; y++) {
                      if (grille[i + y].find(el => el == num)) {
                          imposible[y * 3] = num += 1
                          imposible[y * 3 + 1] = num += 1
                          imposible[y * 3 + 2] = num += 1
                      }
                      if (lvert[i + y].find(el => el == num)) {
                          imposible[y] = num += 1
                          imposible[y + 3] = num += 1
                          imposible[y + 6] = num += 1
                      }
                  }
                  if (imposible.cases() == 8) {
                      let posx = poscase[i][1]
                      let posy = poscase[i][2]
                      let x = imposible.find(el => el == charnone)
                      posx += x % 3
                      posy += (x - (x % 3)) / 3
                      grille[posx][posy] = num
                      lvert[posy][posx]
                      cases[i][x]
                      functionn = true
                  }
              }
              // search if case have 8 nums
              if (cases[i].cases() == 8) {
                  let result = completeligne(cases[i])
                  cases[i][result.pos] = result.num
                  let posx = poscase[i][0]
                  let posy = poscase[i][1]
                  functionn = true
                  posx += result.pos % 3
                  posy += (result.pos - (result.pos % 3)) / 3
                  grille[posx][posy] = result.num
                  lvert[posy][posx] = result.num
              }
              let posx = poscase[i][0]

              let posy = poscase[i][1]
              // searchin if a line or a colums have 8 nums
              for (let k = 0; k < 3; k++) {
                  // console.info(posy+k,posx+k)
                  if (posy + k < 8) {

                      if (lvert[posy + k].cases() == 8) {
                          let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
                          let result = completeligne(lvert[posy + k])
                          grille[result.pos][posy + k] = result.num
                          lvert[posy + k][result.pos] = result.num
                          let ncase = k * 3
                          ncase += result.pos % 3
                          cases[i][ncase] = result.num
                          // for(let t=0;t<9;t++){
                          //     console.log(grille[t])
                          // }
                      }
                  }
                  if (posx + k < 8) {

                      if (grille[posx + k].cases() == 8) {
                          let result = completeligne(grille[posx + k])
                          grille[posx + k][result.pos] = result.num
                          lvert[result.pos][posx + k] = result.num
                          let ncase = k * 3
                          ncase += result.pos % 3
                          cases[i][ncase] = result.num
                      }
                  }
              }
              num++
              if (num == 10) num = 1
          }
      }
      else {
          // search all missing number in all the line and colums
          for (let i = 0; i < 9; i++) {
              // lines
              let r = completelignedersolution(grille[i])
              let posimpossible = []
              for (let l = 0; l < r.num.length; l++) {
                  posimpossible.push(sim(grille[i]))
              }
              // posimposible.length = the nuber of nuber mising
              for (let b = 0; b < r.num.length; b++) {
                  let n = r.num[b]
                  // n = a number missing
                  if (!r.pos) return console.log(r.pos)
                  for (let q = 0; q < r.pos.length; q++) {
                      // p = a pos possible for the number missing
                      let p = r.pos[q]
                      if (lvert[p].find(el => el == n)) {
                          posimpossible[q][p] = 10
                          // checking all colum where heve missing number in the line
                      }
                      let cposx = i % 3
                      let cposy = (p - (p % 3)) / 3
                      let numcase = cposx * 3 + cposy
                      if (cases[numcase].find(el => el == n)) {
                          // cheking all the case in the line if they have a missing number
                          posimpossible[q][cposy] = 10
                          posimpossible[q][cposy + 1] = 10
                          posimpossible[q][cposy + 2] = 10
                      }

                  }
              }
              for (let v = 0; v < posimpossible.length; v++) {
                  if (posimpossible[v].cases() == 8) {
                      // if we can set a number missing in the line
                      functionn = true
                      let result = completeligne(posimpossible[v])
                      grille[i][result.pos] = r.num[v]

                      lvert[result.pos][i] = r.num[v]
                      let ncase = i % 3 * 3
                      ncase += result.pos % 3
                      cases[i][ncase] = r.num[v]
                  }
              }
              // colum
              // the same code but adapted for colums
              let re = completelignedersolution(lvert[i])
              let posimpossible2 = []
              for (let l = 0; i < re.num.length; l++) {
                  posimpossible2.push(sim(lvert[i]))
              }
              for (let b = 0; i < re.num.length; b++) {
                  let n = re.num[b]
                  for (let q = 0; q < re.pos.length; r++) {
                      let p = re.pos[q]
                      if (grille[p].find(el => el == n)) {
                          posimpossible2[q][p] = 10
                      }
                      let cposx = i % 3
                      let cposy = (p - (p % 3)) / 3
                      let numcase = cposx * 3 + cposy
                      if (cases[numcase].find(el => el == n)) {
                          posimpossible[q][cposy] = 10
                          posimpossible[q][cposy + 1] = 10
                          posimpossible[q][cposy + 2] = 10
                      }
                  }
              }
              for (let v = 0; v < posimpossible2.length; i++) {
                  if (posimpossible2[v].cases() == 8) {
                      functionn = true
                      let result = completeligne(posimpossible2[v])
                      lvert[i][result.pos] = r.num[v]
                      grille[result.pos][i] = r.num[v]
                      let ncase = i % 3 * 3
                      ncase += result.pos % 3
                      cases[i][ncase] = r.num[v]
                  }
              }
          }
          if (!functionn) {
              // if after that they have no number in the sudoku they stop
              console.log("errorwe can sand a message the procedure are in the README.md")
              break
          }
          // if after that they have no number in the sudoku they stop
      }
  }
  return grille
}
