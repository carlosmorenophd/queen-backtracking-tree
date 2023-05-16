class Chess {
    constructor(queensNumber) {
        this.board = new Board(queensNumber);
        this.solution = [];
        this.tree = [];
        this.queensNumber = queensNumber;
    }


    solvePuzzle() {
        return this.placeQueen(0, 0);
    }

    


    placeQueen(row, parent) {
        
        if (row > this.queensNumber - 1) {
            return true;
        }
        let columns = [];
        for(let i= 0; i<this.queensNumber; i++){
            columns.push(i);
        }
        let options = this.shuffle(columns);
        // let options = this.shuffle([0, 1, 2, 3, 4, 5, 6, 7]);
        // console.log("Options",row,options);
        
        for (let i = 0; i < options.length; i++) {
            
            let col = options[i];
            const id=`${row}-${col}`
            
            if (this.isSquareThreatened(row, col)) {
                this.tree.push({parent, id, status: "kill"})
                continue;
            }
            this.tree.push({parent, id, status: "safe"})

            this.board.squares[row][col].hasQueen = true;

            if (this.placeQueen(row + 1, id)) {
                this.solution.push(this.board.squares[row][col].id);
                return true;
            }

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


// window.onload = () => {
//     drawMainBoard();
//     playAgain();

//     displayStory();
// }


// function drawMainBoard() {
//     let board = document.getElementById("main-board"),
//         classes = ["white-square", "dark-square"];

//     for (let row = 0; row < 8; row++) {
//         let c = row % 2;

//         for (let col = 0; col < 8; col++) {
//             let square = document.createElement("div");

//             square.className = classes[c] + " " + "square";
//             square.id = `${row}, ${col}`;

//             board.appendChild(square);
//             c = (c + 1) % 2;
//         }
//     }
// }


// function displaySolution() {
//     chess.solution.forEach(id => {
//         let square = document.getElementById(id);
//         square.innerHTML = '<i class="fas fa-chess-queen"></i>';
//     });
// }


function clearBoard() {
    if (chess == null) {
        return;
    }

    // chess.solution.forEach(id => {
    //     let square = document.getElementById(id);
    //     square.innerHTML = '';
    // });
}


function playAgain(queensNumber) {
    clearBoard();
    chess = new Chess(queensNumber);

    if (!chess.solvePuzzle()) {
        alert("Could not find a solution!");
        return;
    }
    console.log("Solution:",chess.solution);
    console.log("tree:",chess.tree);

    // displaySolution();
}


// function displayStory() {
//     let story = document.getElementById("story");
//     story.innerHTML = getStoryHtml();
// }

export { playAgain };