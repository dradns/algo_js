var matrixReshape = function(mat, r, c) {
    origRow = mat.length;
    origCol = mat[0].length;
    origTotalLen = origCol*origRow;
    //произведение r*c
    newTotalLen = r*c;
    //если 1 != 2 тогда вернуть оригинальную матрицу
    if(origTotalLen !== newTotalLen)
        return mat;
    //создать новую матрицу r*c
    var matNew = new Array(r);
    for (var i = 0; i < matNew.length; i++) {
        matNew[i] = new Array(c);
    }

    for(let row = 0; row < r; row++){
        for (let col = 0; col < c; col++){
            matNew[row][col] = getElem(row*c + col, mat, origCol);
            //console.log(row + 'its row');
            //console.log(origCol + 'its origCol');
            //console.log(row*c + col + '     row*c + col');
            //console.log(getElem(row*c + col, mat, origCol));
        }
    }
    return matNew;
};

function getElem(elem, mat, origCol){
    console.log(elem + 'its elem');
    console.log(origCol + 'its origCol');
    console.log((elem - elem % origCol)/origCol + ' номер строки');
    console.log(elem % origCol + ' номер столбца')
    console.log(mat[(elem - elem % origCol)/origCol][elem % origCol] + 'its result');
    console.log(mat + ' its mat');
    return mat[(elem - elem % origCol)/origCol][elem % origCol];
};

mat = [[1,2],[3,4],[5,6],[7,8],[9,10],[11,12]];
r = 4;
c = 3;

console.log(matrixReshape(mat, r, c));