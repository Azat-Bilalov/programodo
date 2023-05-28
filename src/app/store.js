import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { sessionModel } from '@/entities/session';
import { taskModel } from '@/entities/task';
import { logModel } from '@/entities/log';
import { workerModel } from '@/entities/worker';
import { teamModel } from '@/entities/team';
import { projectModel } from '@/entities/project';
import { productModel } from '@/entities/product';

export const store = configureStore({
    reducer: {
        session: sessionModel.reducer,
        [taskModel.reducerPath]: taskModel.reducer,
        [logModel.reducerPath]: logModel.reducer,
        [workerModel.reducerPath]: workerModel.reducer,
        [teamModel.reducerPath]: teamModel.reducer,
        [projectModel.reducerPath]: projectModel.reducer,
        [productModel.reducerPath]: productModel.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            taskModel.middleware,
            logModel.middleware,
            workerModel.middleware,
            teamModel.middleware,
            projectModel.middleware,
            productModel.middleware,
        ),
});

setupListeners(store.dispatch);
