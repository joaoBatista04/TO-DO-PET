import {Router} from 'express'
import { deleteTarefa, getTarefaByID, getTarefas, insertTarefa, updateTarefa } from './models/Tarefa.js';

const router = Router();

router.post('/tasks', insertTarefa);
router.get('/tasks', getTarefas);
router.get('/tasks/:id', getTarefaByID);
router.put('/tasks/:id', updateTarefa);
router.delete('/tasks/:id', deleteTarefa);

export default router;