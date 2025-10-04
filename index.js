document.addEventListener('DOMContentLoaded', () => {
    let matrix = document.querySelector('.matrix');
    let game = document.querySelector('.game');
    let info = document.querySelector('.step1_data');
    let pl1 = document.querySelector('#p1_name');
    let pl2 = document.querySelector('#p2_name');
    let sy1 = document.querySelector('#p1_s');
    let sy2 = document.querySelector('#p2_s');
    let step2 = document.querySelector('.next-step');
    let name1 = document.querySelector('#name1');
    let name2 = document.querySelector('#name2');
    let draw_msg = document.querySelector('.draw');
    let win_msg = document.querySelector('.win');
    let playagain_button = document.querySelector('.Play_again');
    let cells = document.querySelectorAll('.cell');
    let themebutton = document.querySelector('.lb1');
    let setting = document.querySelector('#settings');
    let settings_section = document.querySelector('.settings-section');
    let themes = document.querySelector('.white');
    let body = document.querySelector('.body');
    let board = document.querySelector('.board');
    let light = document.querySelector('.light');
    let soundbutton = document.querySelector('.sound');
    let about_game = document.querySelector('.about-game');
    let us_info = document.querySelector('#us-info');
    let music = document.querySelector('#music');
    let tic_tac = [];
    let check_board = [];


    //function to create a empty matrix
    function create_matrix() {
        for (let i = 0; i < 3; i++) {
            tic_tac[i] = [];
            for (let j = 0; j < 3; j++) {
                tic_tac[i][j] = '';
            }
        }
        console.log(tic_tac);
    }
    //-------------------------------------------------------------------------------------------------------------
    //function to create a visited matrix
    function create_checkboard() {
        for (let i = 0; i < 3; i++) {
            check_board[i] = [];
            for (let j = 0; j < 3; j++) {
                check_board[i][j] = false;
            }
        }
        console.log(check_board);
    }
    create_checkboard();
    create_matrix();
    //---------------------------------------------------------------------------------------------------------
    // step1 display form to save data 
    function step1() {
        console.log(game.style.display);
        if (game.style.display === '' || game.style.display === 'none') {
            if (info.style.display === '' || info.style.display === 'none') {
                info.style.display = 'flex';
                settings_section.style.display = 'none';
                about_game.style.display = 'none';
                win_msg.style.display = 'none';
                draw_msg.style.display = 'none';
                playagain_button.style.display = 'none';
            } else info.style.display = '';
        }
    }
    //fetch play button 
    let playbutton = document.querySelector('#play');
    //after fetching it then i have to add a event on it
    playbutton.addEventListener('click', step1);
    //---------------------------------------------------------------------------------------------------------
    //create function to fetch data
    // this function will collect data from the input fields
    let p1;
    let s1;
    let p2;
    let s2;

    function datacollect() {
        p1 = pl1.value.toUpperCase();
        p2 = pl2.value.toUpperCase();
        s1 = sy1.value.toUpperCase();
        s2 = sy2.value.toUpperCase();
        if (p1 === p2) {
            alert("player name can't be same");
            return;
        } else if (s1 === s2) {
            alert("player symbols can't be same");
            return
        } else if (s1 === '' || s2 === '' || p1 === '' || p2 === '') {
            alert("please fill all the fields");
            return
        }
        info.style.display = 'none';
        name1.innerHTML = p1;
        name2.innerHTML = p2;
        game.style.display = 'flex';
        console.log(p1, p2, s1, s2);
    }
    // this function will be called when the next button is clicked
    step2.addEventListener('click', datacollect);
    //-----------------------------------------------------------------------------------------------------------

    // function if the game gets draw
    function draw_game() {
        game.style.display = 'none';
        draw_msg.style.display = 'flex';
        playagain_button.style.display = 'flex';
        return;
    }
    //-----------------------------------------------------------------------------------------------------------
    // if one will win
    function win_game() {
        game.style.display = 'none';
        if (turn % 2 === 0) {
            win_msg.textContent = p2 + " WON, " + p1 + " GONE";
        } else {
            win_msg.textContent = p1 + " WON, " + p2 + " GONE";
        }
        win_msg.style.display = 'flex';
        playagain_button.style.display = 'flex';
        return;
    }
    //-----------------------------------------------------------------------------------------------------------
    //function to check if a player had won the game or not
    //for checking diagonals 
    function diagonals() {
        if (
            tic_tac[0][0] !== '' &&
            tic_tac[0][0] === tic_tac[1][1] &&
            tic_tac[1][1] === tic_tac[2][2]
        ) return true;

        if (
            tic_tac[0][2] !== '' &&
            tic_tac[0][2] === tic_tac[1][1] &&
            tic_tac[1][1] === tic_tac[2][0]
        ) return true;

        return false;
    }

    //---------------------------------------
    function l_r() {
        for (let i = 0; i < 3; i++) {
            if (
                tic_tac[i][0] !== '' &&
                tic_tac[i][0] === tic_tac[i][1] &&
                tic_tac[i][1] === tic_tac[i][2]
            ) {
                return true;
            }
        }
        return false;
    }


    //----------------------------------------
    function t_d() {
        for (let i = 0; i < 3; i++) {
            if (
                tic_tac[0][i] !== '' &&
                tic_tac[0][i] === tic_tac[1][i] &&
                tic_tac[1][i] === tic_tac[2][i]
            ) {
                return true;
            }
        }
        return false;
    }

    //----------------------------------------
    function check_winner() {
        let d = diagonals();
        let lr = l_r();
        let td = t_d();
        console.log(d, lr, td);
        return d || lr || td;
    }
    //-----------------------------------------
    // function to play chance
    let turn = 1;

    function fill(event) {
        let val = event.target.dataset.value;
        console.log(val);
        let i = val[0];
        let j = val[1];
        if (check_board[i][j] === false) {
            check_board[i][j] = true;
            if (turn % 2 === 0) {
                tic_tac[i][j] = s2;
                console.log(s2);
                event.target.innerHTML = s2;
            } else {
                tic_tac[i][j] = s1;
                event.target.innerHTML = s1;
                console.log(s1);
            }
            if (tic_tac[i][j] !== '') {
                if (check_winner()) win_game();
            }
            if (turn === 9) {
                draw_game();
            }
            turn++;
        }
    }
    //adding event listener to the matrix as whole so i can directly access the target in less TC
    matrix.addEventListener('click', fill);
    //-----------------------------------------------------------------------------------------------------------

    //play again 
    function again() {
        playagain_button.style.display = 'none';
        draw_msg.style.display = 'none';
        win_msg.style.display = 'none';
        pl1.value = '';
        pl2.value = '';
        sy1.value = '';
        sy2.value = '';
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerHTML = '';
        }
        create_matrix();
        create_checkboard();
        turn = 1;
    }
    playagain_button.addEventListener('click', again);
    //-----------------------------------------------------------------------------------------------------------

    function changetheme() {
        if (themebutton.style.justifyContent === 'start' || themebutton.style.justifyContent === '') {
            themebutton.style.justifyContent = 'end'
            themes.className = 'dark';
            body.className = 'dark_body';
            board.className = 'dark_board';
            light.textContent = 'Dark';
        } else {
            themebutton.style.justifyContent = 'start';
            themes.className = 'white';
            body.className = 'body';
            board.className = 'board';
            light.textContent = 'Light';
        }
    }
    themebutton.addEventListener('click', changetheme);

    //-------------------------------------------------------------------------------------

    function soundC() {
        if (soundbutton.textContent === "Sound off") {
            soundbutton.textContent = "Sound on";
            music.play();
        } else if (soundbutton.textContent === "Sound on") {
            soundbutton.textContent = "Sound off";
            music.pause();
        }
    }
    soundbutton.addEventListener('click', soundC);
    //-------------------------------------------------------------------------------------
    console.log(setting);

    function se() {
        if (game.style.display === '' || game.style.display === 'none') {
            if (settings_section.style.display === 'none' || settings_section.style.display === '') {
                settings_section.style.display = 'flex';
                info.style.display = 'none';
                about_game.style.display = 'none';
                win_msg.style.display = 'none';
                draw_msg.style.display = 'none';
                playagain_button.style.display = 'none';
            } else {
                settings_section.style.display = 'none';
            }
        }
    }
    setting.addEventListener('click', se);
    //-----------------------------------------------------------------------

    function ag_on() {
        if (about_game.style.display === 'none' || about_game.style.display === '') {
            about_game.style.display = 'flex';
            settings_section.style.display = 'none';
            info.style.display = 'none';
            win_game.style.display = 'none';
            draw_msg.style.display = 'none';
            playagain_button.style.display = 'none';
            
        } else {
            about_game.style.display = 'none';
        }
    }
    us_info.addEventListener('click', ag_on);
})
function firsPLay(){
        music.play();
    }
    window.onload=firsPLay;