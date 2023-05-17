import dataTree from 'data-tree';

class Chess {
    constructor(queensNumber) {
        this.board = new Board(queensNumber);
        this.solution = [];
        this.treeQueen = [];
        this.queensNumber = queensNumber;
        this.tree = null;
    }


    solvePuzzle() {
        this.tree = dataTree.create();
        return this.placeQueen(0, '0');
    }


    createTree() {
        this.tree.insert({
            key: "0",
            values: {
                status: "none",
                position: "",
            }
        })
        let continueFlag = true;
        let parentNow = ["0"];
        let i = 0;
        while (continueFlag) {
            const children = this.treeQueen.filter(item => parentNow.includes(item.parent));
            // console.log("Children:", children);
            if (children.length > 0) {
                parentNow = [];
                children.forEach(node => {
                    parentNow.push(node.id)
                    this.tree.insertTo((data) => data.key === node.parent, {
                        key: node.id,
                        values: {
                            status: node.status,
                            position: node.id,
                        }
                    })
                });
            } else {
                continueFlag = false;
            }
            if(i>20){
                continueFlag = false;
            }else{
                i++;
            }
        }
    }

    addPush(newPosition) {
        const index = this.treeQueen.findIndex((item) => item.id === newPosition.id);
        if (index >= 0) {
            this.treeQueen[index].status = newPosition.status;
            this.treeQueen[index].parent = newPosition.parent;
        } else {
            this.treeQueen.push(newPosition);
        }

    }

    placeQueen(row, parent) {

        if (row > this.queensNumber - 1) {
            return true;
        }
        let columns = [];
        for (let i = 0; i < this.queensNumber; i++) {
            columns.push(i);
        }
        let options = this.shuffle(columns);
        // let options = this.shuffle([0, 1, 2, 3, 4, 5, 6, 7]);
        // console.log("Options",row,options);

        for (let i = 0; i < options.length; i++) {

            let col = options[i];
            const id = `${row}-${col}`

            if (this.isSquareThreatened(row, col)) {
                this.addPush({ parent, id, status: "removed" })
                continue;
            }
            this.board.squares[row][col].hasQueen = true;
            if (this.placeQueen(row + 1, id)) {
                this.addPush({ parent, id, status: "safe" });
                this.solution.push(this.board.squares[row][col].id);
                return true;
            }
            this.addPush({ parent, id, status: "back" })
            this.board.squares[row][col].hasQueen = false;
        }
        return false;
    }


    isSquareThreatened(row, col) {
        return this.isColumnThreatened(row, col) ||
            this.isDiagonalThreatenedNW(row, col) ||
            this.isDiagonalThreatenedNE(row, col);
    }


    isColumnThreatened(row, col) {
        for (let r = row - 1; r >= 0; r--) {
            if (this.board.squares[r][col].hasQueen) {
                return true;
            }
        }

        return false;
    }


    isDiagonalThreatenedNW(row, col) {
        for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--) {
            if (this.board.squares[r][c].hasQueen) {
                return true;
            }
        }

        return false;
    }


    isDiagonalThreatenedNE(row, col) {
        for (let r = row - 1, c = col + 1; r >= 0 && c < this.queensNumber; r--, c++) {
            if (this.board.squares[r][c].hasQueen) {
                return true;
            }
        }

        return false;
    }


    shuffle(a) {
        let a2 = [];

        while (a.length > 0) {
            let i = Math.floor(Math.random() * a.length);
            a2.push(...a.splice(i, 1));
        }

        return a2;
    }
}


class Board {
    constructor(queensNumber) {
        this.squares = [];

        for (let r = 0; r < queensNumber; r++) {
            let row = [];

            for (let c = 0; c < queensNumber; c++) {
                let square = new Square(r, c);
                row.push(square);
            }

            this.squares.push(row);
        }
    }
}

class Square {
    constructor(row, col) {
        this.row = row;
        this.col = col;

        this.hasQueen = false;
        this.id = `${row}, ${col}`;
    }
}


let chess = null;

function clearBoard() {
    if (chess == null) {
        return;
    }

}

function playAgain(queensNumber) {
    clearBoard();
    chess = new Chess(queensNumber);

    if (!chess.solvePuzzle()) {
        alert("Could not find a solution!");
        return;
    }
    console.log("Solution:", chess.solution);
    console.log("tree:", chess.treeQueen);
    chess.createTree();
    return chess.tree.export((data) => {
        return {
            name: `${data.values.position}`,
            attributes: {
                tag: data.values.status,
            },
        }
    })
}

export { playAgain };