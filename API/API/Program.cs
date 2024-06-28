using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);

var app = builder.Build();


app.MapGet("/", () => "Prova A1");

//ENDPOINTS DE CATEGORIA
//GET: http://localhost:5000/categoria/listar
app.MapGet("/categoria/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Categorias.Any())
    {
        return Results.Ok(ctx.Categorias.ToList());
    }
    return Results.NotFound("Nenhuma categoria encontrada");
});

//POST: http://localhost:5000/categoria/cadastrar
app.MapPost("/categoria/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Categoria categoria) =>
{
    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("", categoria);
});

//ENDPOINTS DE TAREFA
//GET: http://localhost:5000/tarefas/listar
app.MapGet("/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

//POST: http://localhost:5000/tarefas/cadastrar
app.MapPost("/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    Categoria? categoria = ctx.Categorias.Find(tarefa.CategoriaId);
    if (categoria == null)
    {
        return Results.NotFound("Categoria não encontrada");
    }
    tarefa.Categoria = categoria;
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

//PUT: http://localhost:5000/tarefas/alterar/{id}
app.MapPut("/tarefas/alterar/{id}", ([FromServices] AppDataContext ctx,[FromBody] Tarefa tarefaAtt, [FromRoute] string id) =>
{
 
    Tarefa? tarefaParaAtt = ctx.Tarefas.Find(id);
    
  
    if (tarefaParaAtt == null) {
        return Results.NotFound("Tarefa não encontrado");
    }

    tarefaParaAtt.Titulo = tarefaAtt.Titulo;
    tarefaParaAtt.Descricao = tarefaAtt.Descricao;
    tarefaParaAtt.CategoriaId = tarefaAtt.CategoriaId;
    tarefaParaAtt.Status = tarefaAtt.Status;

    ctx.Tarefas.Update(tarefaParaAtt);
    
   
    ctx.SaveChanges();
    
    return Results.Ok(tarefaParaAtt);
});

//GET: http://localhost:5000/tarefas/naoconcluidas
app.MapGet("/tarefas/naoconcluidas", ([FromServices] AppDataContext ctx) =>
{

    List<Tarefa> todasTarefas = ctx.Tarefas.ToList();
    List<Tarefa> tarefasNaoInciadas = new List<Tarefa>();

        foreach (var tarefa in todasTarefas)
        {   
            string a =  "Não iniciada";
             string b =  "Em andamento";
            if (tarefa.Status == a || tarefa.Status == b)
            {
                
                tarefasNaoInciadas.Add(tarefa);
            }
        }
    

    if (tarefasNaoInciadas == null)
    {
        return Results.NotFound("Nenhuma tarefa encontrada");
    }
        return Results.Ok(tarefasNaoInciadas);
    
});

//GET: http://localhost:5000/tarefas/concluidas
app.MapGet("/tarefas/concluidas", ([FromServices] AppDataContext ctx) =>
{
    List<Tarefa> todasTarefas = ctx.Tarefas.ToList();
    List<Tarefa> tarefasConcluidas = new List<Tarefa>();

        foreach (var tarefa in todasTarefas)
        {
            string a = "Concluída";
            if (tarefa.Status == a)
            {
              
                tarefasConcluidas.Add(tarefa);
            }
        }
    

    if (tarefasConcluidas == null)
    {
        return Results.NotFound("Nenhuma tarefa encontrada");
    }
        return Results.Ok(tarefasConcluidas);
});
app.UseCors("Acesso Total");
app.Run();
