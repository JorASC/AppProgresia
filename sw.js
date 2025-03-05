//asignar nombre y version de la cache
//constante
const CACHE_NAME="v1_cache_PWA"

var urlsToCache=[
    //Aqui se van a agregar todos los ficheros de la app
    './sw.js',
    './app.js',
    './image.jpeg',
    './CV.html',
    './main.js',
    './IMG/icon-16.png',
    './IMG/icon-32.png',
    './IMG/icon-64.png',
    './IMG/icon-96.png',
    './IMG/icon-128.png',
    './IMG/icon-144.png',
    './IMG/icon-192.png',
    './IMG/icon-240.png',
    './IMG/icon-256.png',
    './IMG/icon-384.png',
    './IMG/icon-512.png',
    './IMG/icon-1024.png',

];

//inicializacion del sw y
//guardar los recursos estaticos de la aplicacion
//evento install

self.addEventListener('install',e=>{
    //añadidos todos los elementos de la cache
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cahe => {
            return cache.addAll(urlsToCache)
            .then(()=> {
                self.skipWaiting();
        }) 
        })
        .catch(err=>{
            console.log('Unable to load cache', err)
        })
    )
});

//evento Activate el sw para trabajar offline

self.addEventListener('activate', e=>{
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
        .then(cacheNames =>
        {
            return Promise.all(
                cacheNames.map(cacheName=>
                {
                    if(cacheWhiteList.indexOf(cacheName)=== -1)
                    {
                        //borrar los elementos que ya ano existen en la cache o no se necesitan
                        return cache.delete(cacheName);
                    }
                }
                )
            )
        }
        ) .then(()=>{
            //activar cache e dispositivo
            self.clients.claim();
        })
    )
})

self.addEventListener('fetch', e=>{
    e.respondWith(
        caches.match(e.request)
        .then(res=>{
            if(res){
                //devolver datos desde cache
                return res;
            }
            return fetch(e.request);
        })
    )
}); 