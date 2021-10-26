import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Se a variavel newTasktitle não existe pare(return/como se fosse um break em C) 
    if( !newTaskTitle ) return;
    // Criando um objeto para guardar as informações da tarefa
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    }
    // Copiando a informações que ja existia anteriormente(oldstate),adicionando a nova informações(newTask) e
    // fazendo com que a nova informação seja uma junção das antigas com as novas 
    // (... isso significa pegar todas as informações já existentes ali)
    setTasks(oldState => [...oldState, newTask]);
    // Atribui ao campo de nome um valor vazio, fazendo a função de limpar o mesmo
    setNewTaskTitle("");

    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
  }

  function handleToggleTaskCompletion(id: number) {
    // Criando uma nova variavel que irá percorrer o vetor de informações(tasks) utilizando map
    // caso ele encontre um id igual ao que o usuario selecionou( usando um operador ternario ? que é um if/else ) 
    // ( no caso ao clicar no elemento de marcar/desmarcar tarefa) 
    // irá pegar todas as informações da task com o id igual e irá inveter o atributo isComplete
    //caso contrario, só irá retornar as informações da task
    const newTasks = tasks.map(task => task.id === id 
      ? {
      ...task,
      isComplete: !task.isComplete
    } :task );
    // alterando o estado da tasks com as informações da variavel newTasks
    setTasks(newTasks);

    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
  }

  function handleRemoveTask(id: number) {
    // Criando uma variavel que irá receber as informações filtradas da tasks
    // utilizando o filter, irá selecionar todas as tarefas com o id diferente da task selecionada
    // como se fosse um filtro invertido
    const filteredTasks = tasks.filter(task => task.id != id);
    setTasks(filteredTasks);

    // Remova uma task da listagem pelo ID
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}