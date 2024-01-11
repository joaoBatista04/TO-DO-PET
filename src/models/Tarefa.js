import {openDb} from '../configDB.js'

export async function createTable(){
    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS Tarefa ( id INTEGER PRIMARY KEY, title TEXT, description TEXT, due_date TEXT, completed INTEGER )');
    })
}

export async function insertTarefa(req, res){
    let tarefa = req.body;

    openDb().then(db=>{
        db.run('INSERT INTO Tarefa (title, description, due_date, completed) VALUES (?,?,?,?)', [tarefa.title, tarefa.description, tarefa.due_date, tarefa.completed]);
    });

    res.json({
        "statusCode": 200,
    });
}

export async function getTarefas(req, res){
    openDb().then(db=>{
        db.all('SELECT * FROM Tarefa')
        .then(tarefas=>res.json(tarefas));
    });
}

export async function getTarefaByID(req, res){
    let id = req.params['id'];

    if(!id){
        res.json({
            "statusCode": 400,
            "msg": "Missing parameters (task id)"
        });
    } else{
        openDb().then(db=>{
            db.get('SELECT * FROM Tarefa WHERE id=?', [id])
            .then(tarefa=>res.json(tarefa));
        });
    }
}

export async function updateTarefa(req, res){
    let id = req.params['id'];
    let tarefa = req.body;

    if(!id){
        res.json({
            "statusCode": 400,
            "msg": "Missing parameters (task id)"
        });
    } else{
        openDb().then(db=>{
            db.run('UPDATE Tarefa SET title=?, description=?, due_date=?, completed=? WHERE id=?', [tarefa.title, tarefa.description, tarefa.due_date, tarefa.completed, id]);
        });

        res.json({
            "statusCode": 200
        });
    }
}

export async function deleteTarefa(req, res){
    let id = req.params['id'];

    if(!id){
        res.json({
            "statusCode": 400,
            "msg": "Missing parameters (task id)"
        });
    } else{
        openDb().then(db=>{
            db.get('DELETE FROM Tarefa WHERE id=?', [id])
            .then(deletedTask=>res.json(deletedTask));
        })
    }
}