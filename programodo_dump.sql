--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: client; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.client (
    id integer NOT NULL,
    fio character varying(50) NOT NULL,
    login character varying(15) NOT NULL,
    email character varying(30) NOT NULL,
    hashpassword character varying(16) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.client OWNER TO root;

--
-- Name: client_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.client_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.client_id_seq OWNER TO root;

--
-- Name: client_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.client_id_seq OWNED BY public.client.id;


--
-- Name: comment; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.comment (
    id integer NOT NULL,
    text text NOT NULL,
    productclient integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.comment OWNER TO root;

--
-- Name: comment_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_id_seq OWNER TO root;

--
-- Name: comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.comment_id_seq OWNED BY public.comment.id;


--
-- Name: log; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.log (
    id integer NOT NULL,
    text text,
    task integer,
    worker integer,
    body text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.log OWNER TO root;

--
-- Name: log_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.log_id_seq OWNER TO root;

--
-- Name: log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.log_id_seq OWNED BY public.log.id;


--
-- Name: product; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    description text NOT NULL,
    version character varying(10) NOT NULL,
    gitrepository character varying(50) NOT NULL,
    license character varying(20) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.product OWNER TO root;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_id_seq OWNER TO root;

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- Name: productclient; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.productclient (
    id integer NOT NULL,
    product integer NOT NULL,
    client integer NOT NULL,
    grade integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT productclient_grade_check CHECK (((grade >= 0) AND (grade <= 5)))
);


ALTER TABLE public.productclient OWNER TO root;

--
-- Name: productclient_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.productclient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.productclient_id_seq OWNER TO root;

--
-- Name: productclient_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.productclient_id_seq OWNED BY public.productclient.id;


--
-- Name: project; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.project (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    description text NOT NULL,
    version character varying(10) NOT NULL,
    gitrepository character varying(200) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    product integer
);


ALTER TABLE public.project OWNER TO root;

--
-- Name: project_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_id_seq OWNER TO root;

--
-- Name: project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.project_id_seq OWNED BY public.project.id;


--
-- Name: task; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.task (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    description text,
    status character(2) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    project integer NOT NULL,
    CONSTRAINT task_status_check CHECK ((status = ANY (ARRAY['OP'::bpchar, 'PR'::bpchar, 'RE'::bpchar, 'CL'::bpchar])))
);


ALTER TABLE public.task OWNER TO root;

--
-- Name: task_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.task_id_seq OWNER TO root;

--
-- Name: task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.task_id_seq OWNED BY public.task.id;


--
-- Name: team; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.team (
    id integer NOT NULL,
    name character varying(20) NOT NULL,
    direction character(2) NOT NULL,
    project integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT team_direction_check CHECK ((direction = ANY (ARRAY['DV'::bpchar, 'DS'::bpchar, 'TS'::bpchar])))
);


ALTER TABLE public.team OWNER TO root;

--
-- Name: team_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.team_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.team_id_seq OWNER TO root;

--
-- Name: team_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.team_id_seq OWNED BY public.team.id;


--
-- Name: worker; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.worker (
    id integer NOT NULL,
    fio character varying(50) NOT NULL,
    login character varying(15) NOT NULL,
    email character varying(30) NOT NULL,
    contacts character varying(30) NOT NULL,
    post character(3) NOT NULL,
    team integer,
    experience integer DEFAULT 0,
    salary money NOT NULL,
    hashpassword character varying(16) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT worker_experience_check CHECK ((experience >= 0)),
    CONSTRAINT worker_post_check CHECK ((post = ANY (ARRAY['JDV'::bpchar, 'SDV'::bpchar, 'JTS'::bpchar, 'STS'::bpchar, 'JDS'::bpchar, 'SDS'::bpchar, 'PJM'::bpchar, 'PDM'::bpchar, 'CEO'::bpchar])))
);


ALTER TABLE public.worker OWNER TO root;

--
-- Name: worker_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.worker_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.worker_id_seq OWNER TO root;

--
-- Name: worker_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.worker_id_seq OWNED BY public.worker.id;


--
-- Name: client id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.client ALTER COLUMN id SET DEFAULT nextval('public.client_id_seq'::regclass);


--
-- Name: comment id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.comment ALTER COLUMN id SET DEFAULT nextval('public.comment_id_seq'::regclass);


--
-- Name: log id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.log ALTER COLUMN id SET DEFAULT nextval('public.log_id_seq'::regclass);


--
-- Name: product id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Name: productclient id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.productclient ALTER COLUMN id SET DEFAULT nextval('public.productclient_id_seq'::regclass);


--
-- Name: project id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.project ALTER COLUMN id SET DEFAULT nextval('public.project_id_seq'::regclass);


--
-- Name: task id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.task ALTER COLUMN id SET DEFAULT nextval('public.task_id_seq'::regclass);


--
-- Name: team id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.team ALTER COLUMN id SET DEFAULT nextval('public.team_id_seq'::regclass);


--
-- Name: worker id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.worker ALTER COLUMN id SET DEFAULT nextval('public.worker_id_seq'::regclass);


--
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.client (id, fio, login, email, hashpassword, created_at) FROM stdin;
1	╨Э╨░╨▒╨╕╨╡╨▓╨░ ╨Ь╨╕╨╗╤О╤И╨░ ╨а╨╡╨╡╤Б╤В╤А╨╛╨▓╨╜╨░	╨Ь╨╕╨╗╤О╤И╨░	mila@mail.ru	6260c957350e1102	2023-05-27 09:42:06.762163
2	╨Р╤А╤В╤Г╤А ╨Ы╨╛╨╗╨╕╨║╨╛╨▓╨╕╤З	Artur	artur.lol@gmail.com	1b92c32b14ff0f8a	2023-05-27 09:42:06.762163
3	╨б╤Г╤А╨│╤Г╤В╨╛╨▓ ╨б╤Г╤А╨│╤Г╤В ╨б╤Г╤А╨│╤Г╤В╨╛╨▓╨╕╤З	╨б╤Г╤А╨│╤Г╤В123	surgut@inbox.ru	957376185e448342	2023-05-27 09:42:06.762163
4	╨Ы╨░╤Б╤В╨╛╤З╨║╨╕╨╜ ╨Ы╨░╤Б╤В╨╛╤З╨║╨░ ╨Ы╨░╤Б╤В╨╛╤З╨║╨╕╨╜	╨Ы╨░╤Б╤В╨╛╤З╨║╨╕╨╜	lastochlin@gmail.com	f8ec821dad23f1af	2023-05-27 09:42:06.762163
5	╨Ь╨╕╤Е╨░╨╣╨╗╨╛╨▓ ╨Ю╨╗╨╡╨│ ╨Ю╨╗╨╡╨│╨╛╨▓╨╕╤З	Oleg	olega@gmail.com	29236f9e6d91bcc0	2023-05-27 09:42:06.762163
7	╨С╨╕╨╗╨░╨╗╨╛╨▓ ╨Р╨╖╨░╤В ╨Ъ╨░╤А╨╕╨╝╨╛╨▓╨╕╤З	azat	az.bilalov@mail.ru	52d04dc20036dbd8	2023-05-27 10:58:07.303154
\.


--
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.comment (id, text, productclient, created_at) FROM stdin;
1	╨Ю╤З╨╡╨╜╤М ╤Е╨╛╤А╨╛╤И╨╕╨╣ ╨┐╤А╨╛╨┤╤Г╨║╤В	1	2023-05-27 09:42:06.762163
2	╨Ь╨╜╨╡ ╨╜╨╡ ╨┐╨╛╨╜╤А╨░╨▓╨╕╨╗╨╛╤Б╤М, ╤З╤В╨╛ ╨╛╨╜ ╨╜╨╡ ╤А╨░╨▒╨╛╤В╨░╨╡╤В	2	2023-05-27 09:42:06.762163
3	╨С╤Л╨╗╨╛ ╨▒╤Л ╨╜╨╡╨┐╨╗╨╛╤Е╨╛ ╨┤╨╛╨▒╨░╨▓╨╕╤В╤М ╤Д╤Г╨╜╨║╤Ж╨╕╤О, ╨║╨╛╤В╨╛╤А╨░╤П ╨▓╤Л╨┤╨╡╨╗╤П╨╡╤В ╨▓╤Б╨╡ ╤Б╨╗╨╛╨▓╨░ ╨▓ ╤В╨╡╨║╤Б╤В╨╡	3	2023-05-27 09:42:06.762163
4	╨б╤Л╤А╨╛╨╣ ╨┐╤А╨╛╨┤╤Г╨║╤В, ╨╜╤Г╨╢╨╜╨░ ╨┤╨╛╤А╨╛╨▒╨╛╤В╨║╨░	4	2023-05-27 09:42:06.762163
5	╨н╤В╨╛ ╨╗╤Г╤З╤И╨╕╨╣ ╨┐╤А╨╛╨┤╤Г╨║╤В, ╨║╨╛╤В╨╛╤А╤Л╨╣ ╤П ╨║╨╛╨│╨┤╨░-╨╗╨╕╨▒╨╛ ╨▓╨╕╨┤╨╡╨╗	5	2023-05-27 09:42:06.762163
6	╨Э╤Г-╤Г ╨╜╨╡ ╨╖╨╜╨░╤О, ╨╜╨╡ ╨╛╤З╨╡╨╜╤М	6	2023-05-27 09:42:06.762163
7	,kljiuytr5e4	7	2023-05-27 11:06:36.452186
\.


--
-- Data for Name: log; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.log (id, text, task, worker, body, created_at) FROM stdin;
1	╨Ч╨░╨┤╨░╤З╨░ ╨╖╨░╨▓╨╡╤А╤И╨╡╨╜╨░ ╤Г╤Б╨┐╨╡╤И╨╜╨╛	1	1	╨Ч╨░╨┤╨░╤З╨░ "╨а╨░╨╖╤А╨░╨▒╨╛╤В╨║╨░ ╨╗╨╛╨│╨╕╨╜ ╤Б╤В╤А╨░╨╜╨╕╤Ж╤Л" ╤Г╤Б╨┐╨╡╤И╨╜╨╛ ╨╖╨░╨▓╨╡╤А╤И╨╡╨╜╨░	2023-05-27 09:42:06.762163
2	╨в╤А╨╡╨▒╤Г╨╡╤В╤Б╤П ╨┤╨╛╤А╨░╨▒╨╛╤В╨║╨░	1	2	╨Э╨╡╨╛╨▒╤Е╨╛╨┤╨╕╨╝╨╛ ╨▓╨╜╨╡╤Б╤В╨╕ ╨╜╨╡╨║╨╛╤В╨╛╤А╤Л╨╡ ╨╕╤Б╨┐╤А╨░╨▓╨╗╨╡╨╜╨╕╤П ╨▓ ╨╖╨░╨┤╨░╤З╤Г "╨а╨░╨╖╤А╨░╨▒╨╛╤В╨║╨░ ╨╗╨╛╨│╨╕╨╜ ╤Б╤В╤А╨░╨╜╨╕╤Ж╤Л"	2023-05-27 09:42:06.762163
3	╨Ю╨▒╨╜╨╛╨▓╨╗╨╡╨╜ ╤Б╤В╨░╤В╤Г╤Б ╨╖╨░╨┤╨░╤З╨╕	2	1	╨б╤В╨░╤В╤Г╤Б ╨╖╨░╨┤╨░╤З╨╕ "╨Э╨░╤Б╤В╤А╨╛╨╣╨║╨░ ╨▒╨░╨╖╤Л ╨┤╨░╨╜╨╜╤Л╤Е" ╨╕╨╖╨╝╨╡╨╜╨╡╨╜ ╨╜╨░ "╨Т ╨┐╤А╨╛╤Ж╨╡╤Б╤Б╨╡"	2023-05-27 09:42:06.762163
4	╨Ч╨░╨┤╨░╤З╨░ ╨┐╤А╨╕╨╜╤П╤В╨░ ╨▓ ╤А╨░╨▒╨╛╤В╤Г	2	3	╨Ч╨░╨┤╨░╤З╨░ "╨Э╨░╤Б╤В╤А╨╛╨╣╨║╨░ ╨▒╨░╨╖╤Л ╨┤╨░╨╜╨╜╤Л╤Е" ╨┐╤А╨╕╨╜╤П╤В╨░ ╨▓ ╤А╨░╨▒╨╛╤В╤Г	2023-05-27 09:42:06.762163
5	╨Ф╨╛╨▒╨░╨▓╨╗╨╡╨╜ ╨╜╨╛╨▓╤Л╨╣ ╨║╨╛╨╝╨╝╨╡╨╜╤В╨░╤А╨╕╨╣	3	2	╨Ф╨╛╨▒╨░╨▓╨╗╨╡╨╜ ╨║╨╛╨╝╨╝╨╡╨╜╤В╨░╤А╨╕╨╣ ╨║ ╨╖╨░╨┤╨░╤З╨╡ "╨а╨░╨╖╤А╨░╨▒╨╛╤В╨║╨░ API"	2023-05-27 09:42:06.762163
6	╨Ч╨░╨┤╨░╤З╨░ ╨╖╨░╨║╤А╤Л╤В╨░	3	1	╨Ч╨░╨┤╨░╤З╨░ "╨а╨░╨╖╤А╨░╨▒╨╛╤В╨║╨░ API" ╨╖╨░╨║╤А╤Л╤В╨░	2023-05-27 09:42:06.762163
7	╨в╤А╨╡╨▒╤Г╨╡╤В╤Б╤П ╨┐╤А╨╛╨▓╨╡╤А╨║╨░	4	3	╨Я╤А╨╛╤Б╤М╨▒╨░ ╨┐╤А╨╛╨▓╨╡╤А╨╕╤В╤М ╤Д╤Г╨╜╨║╤Ж╨╕╨╛╨╜╨░╨╗╤М╨╜╨╛╤Б╤В╤М ╨┤╨╛╨▒╨░╨▓╨╗╨╡╨╜╨╕╤П ╨║╨╛╨╝╨╝╨╡╨╜╤В╨░╤А╨╕╨╡╨▓	2023-05-27 09:42:06.762163
8	╨Ш╤Б╨┐╤А╨░╨▓╨╗╨╡╨╜╨░ ╨╛╤И╨╕╨▒╨║╨░	4	2	╨Ш╤Б╨┐╤А╨░╨▓╨╗╨╡╨╜╨░ ╨╛╤И╨╕╨▒╨║╨░ ╨▓ ╤Д╤Г╨╜╨║╤Ж╨╕╨╛╨╜╨░╨╗╤М╨╜╨╛╤Б╤В╨╕ ╨┤╨╛╨▒╨░╨▓╨╗╨╡╨╜╨╕╤П ╨║╨╛╨╝╨╝╨╡╨╜╤В╨░╤А╨╕╨╡╨▓	2023-05-27 09:42:06.762163
9	╨Ч╨░╨┤╨░╤З╨░ ╨┐╨╡╤А╨╡╨┤╨░╨╜╨░ ╨╜╨░ ╤В╨╡╤Б╤В╨╕╤А╨╛╨▓╨░╨╜╨╕╨╡	5	1	╨Ч╨░╨┤╨░╤З╨░ "╨в╨╡╤Б╤В╨╕╤А╨╛╨▓╨░╨╜╨╕╨╡ ╨╕ ╨╛╤В╨╗╨░╨┤╨║╨░" ╨┐╨╡╤А╨╡╨┤╨░╨╜╨░ ╨╜╨░ ╤В╨╡╤Б╤В╨╕╤А╨╛╨▓╨░╨╜╨╕╨╡	2023-05-27 09:42:06.762163
10	╨Ч╨░╨┤╨░╤З╨░ ╨╖╨░╨▒╨╗╨╛╨║╨╕╤А╨╛╨▓╨░╨╜╨░	5	3	╨Ч╨░╨┤╨░╤З╨░ "╨в╨╡╤Б╤В╨╕╤А╨╛╨▓╨░╨╜╨╕╨╡ ╨╕ ╨╛╤В╨╗╨░╨┤╨║╨░" ╨╖╨░╨▒╨╗╨╛╨║╨╕╤А╨╛╨▓╨░╨╜╨░ ╨┤╨╗╤П ╨╕╨╖╨╝╨╡╨╜╨╡╨╜╨╕╨╣	2023-05-27 09:42:06.762163
11	╨Ч╨░╨┤╨░╤З╨░ ╨╖╨░╨▒╨╗╨╛╨║╨╕╤А╨╛╨▓╨░╨╜╨░	5	1	╨Ч╨░╨┤╨░╤З╨░ "╨в╨╡╤Б╤В╨╕╤А╨╛╨▓╨░╨╜╨╕╨╡ ╨╕ ╨╛╤В╨╗╨░╨┤╨║╨░" ╨╖╨░╨▒╨╗╨╛╨║╨╕╤А╨╛╨▓╨░╨╜╨░ ╨┤╨╗╤П ╨╕╨╖╨╝╨╡╨╜╨╡╨╜╨╕╨╣	2023-05-27 11:11:55.938467
12	╨Ч╨░╨┤╨░╤З╨░ ╨╖╨░╨▒╨╗╨╛╨║╨╕╤А╨╛╨▓╨░╨╜╨░	5	1	╨Ч╨░╨┤╨░╤З╨░ "╨в╨╡╤Б╤В╨╕╤А╨╛╨▓╨░╨╜╨╕╨╡ ╨╕ ╨╛╤В╨╗╨░╨┤╨║╨░" ╨╖╨░╨▒╨╗╨╛╨║╨╕╤А╨╛╨▓╨░╨╜╨░ ╨┤╨╗╤П ╨╕╨╖╨╝╨╡╨╜╨╡╨╜╨╕╨╣njhgf	2023-05-27 11:12:06.753037
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.product (id, name, description, version, gitrepository, license, created_at) FROM stdin;
1	WordPress	╨б╨╕╤Б╤В╨╡╨╝╨░ ╤Г╨┐╤А╨░╨▓╨╗╨╡╨╜╨╕╤П ╨║╨╛╨╜╤В╨╡╨╜╤В╨╛╨╝	5.8.1	https://github.com/WordPress/WordPress	GPL-2.0-or-later	2023-05-27 09:42:06.762163
2	React	╨С╨╕╨▒╨╗╨╕╨╛╤В╨╡╨║╨░ JavaScript ╨┤╨╗╤П ╤Б╨╛╨╖╨┤╨░╨╜╨╕╤П ╨┐╨╛╨╗╤М╨╖╨╛╨▓╨░╤В╨╡╨╗╤М╤Б╨║╨╕╤Е ╨╕╨╜╤В╨╡╤А╤Д╨╡╨╣╤Б╨╛╨▓	17.0.2	https://github.com/facebook/react	MIT	2023-05-27 09:42:06.762163
3	Node.js	JavaScript-╤Б╤А╨╡╨┤╨░ ╨▓╤Л╨┐╨╛╨╗╨╜╨╡╨╜╨╕╤П ╤Б ╨╛╤В╨║╤А╤Л╤В╤Л╨╝ ╨╕╤Б╤Е╨╛╨┤╨╜╤Л╨╝ ╨║╨╛╨┤╨╛╨╝	14.17.0	https://github.com/nodejs/node	MIT	2023-05-27 09:42:06.762163
4	Django	╨д╤А╨╡╨╣╨╝╨▓╨╛╤А╨║ ╨┤╨╗╤П ╨▓╨╡╨▒-╨┐╤А╨╕╨╗╨╛╨╢╨╡╨╜╨╕╨╣ ╨╜╨░ ╤П╨╖╤Л╨║╨╡ Python	3.2.4	https://github.com/django/django	BSD-3-Clause	2023-05-27 09:42:06.762163
5	Angular	╨д╤А╨╡╨╣╨╝╨▓╨╛╤А╨║ ╨┤╨╗╤П ╤Б╨╛╨╖╨┤╨░╨╜╨╕╤П ╨╛╨┤╨╜╨╛╤Б╤В╤А╨░╨╜╨╕╤З╨╜╤Л╤Е ╨┐╤А╨╕╨╗╨╛╨╢╨╡╨╜╨╕╨╣	12.0.3	https://github.com/angular/angular	MIT	2023-05-27 09:42:06.762163
6	╨Ь╨У╨в╨г	╨Т╨г╨Ч	0.1.0	http://,,,,,	MIT	2023-05-27 11:10:24.94638
\.


--
-- Data for Name: productclient; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.productclient (id, product, client, grade, created_at) FROM stdin;
1	1	1	4	2023-05-27 09:42:06.762163
2	1	2	3	2023-05-27 09:42:06.762163
3	2	1	2	2023-05-27 09:42:06.762163
4	3	2	5	2023-05-27 09:42:06.762163
5	4	3	1	2023-05-27 09:42:06.762163
6	5	4	3	2023-05-27 09:42:06.762163
7	2	7	0	2023-05-27 11:06:31.354897
\.


--
-- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.project (id, name, description, version, gitrepository, created_at, product) FROM stdin;
1	Programodo UI	╨Ф╨╕╨╖╨░╨╣╨╜ ╤Б╨╕╤Б╤В╨╡╨╝╨░ ╨║╨╛╨╝╨┐╨░╨╜╨╕╨╕	0.1.0	https://github.com/programodo/ui-system	2023-05-27 09:42:06.762163	1
2	Programodo CLI	╨Ъ╨╗╨░╨▓╨╕╨░╤В╤Г╤А╨╜╤Л╨╣ ╨║╨╗╨╕╨╡╨╜╤В	1.0.0	https://github.com/programodo/cli-client	2023-05-27 09:42:06.762163	2
3	Weather analyser	╨Р╨╜╨░╨╗╨╕╨╖╨░╤В╨╛╤А ╨╕ ╨┐╤А╨╡╨┤╤Б╨║╨░╨╖╨░╤В╨╡╨╗╤М ╨┐╨╛╨│╨╛╨┤╤Л	3.0.0	https://github.com/programodo/weather-analyser	2023-05-27 09:42:06.762163	3
4	╨Я╨╡╤Б╨╛╤З╨╜╨╕╤Ж╨░	╨Ю╤В╨║╤А╤Л╤В╨░╤П ╨┐╨╡╤Б╨╛╤З╨╜╨╕╤Ж╨░ ╨┤╨╗╤П ╤В╨╡╤Б╤В╨╕╤А╨╛╨▓╨░╨╜╨╕╤П ╨┐╤А╨╛╨╡╨║╤В╨╛╨▓ ╨╜╨░ node.js	0.2.3	https://github.com/programodo/nodejs-sandbox	2023-05-27 09:42:06.762163	4
5	╨и╨░╨▒╨╗╨╛╨╜╨╕╨╖╨░╤В╨╛╤А	╨и╨░╨▒╨╗╨╛╨╜╨╕╨╖╨░╤В╨╛╤А ╨┤╨╗╤П ╤Б╨╛╨╖╨┤╨░╨╜╨╕╤П ╤Б╨░╨╣╤В╨╛╨▓ ╨╜╨░ node.js	5.0.0	https://github.com/programodo/nodejs-template-engine	2023-05-27 09:42:06.762163	5
6	╨Я╤А╨╛╨╡╨║╤В ╨Ь╨У╨в╨г	╨а╨░╨╖╨▓╨╕╨▓╨░╨╡╨╝ it	0.1.0	http://	2023-05-27 11:11:16.586749	6
\.


--
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.task (id, name, description, status, created_at, project) FROM stdin;
1	╨а╨░╨╖╤А╨░╨▒╨╛╤В╨║╨░ ╨╗╨╛╨│╨╕╨╜ ╤Б╤В╤А╨░╨╜╨╕╤Ж╤Л	╨б╨╛╨╖╨┤╨░╤В╤М ╨╕╨╜╤В╨╡╤А╤Д╨╡╨╣╤Б ╨┤╨╗╤П ╨▓╤Е╨╛╨┤╨░ ╨▓ ╤Б╨╕╤Б╤В╨╡╨╝╤Г	OP	2023-05-27 09:42:06.762163	1
2	╨Э╨░╤Б╤В╤А╨╛╨╣╨║╨░ ╨▒╨░╨╖╤Л ╨┤╨░╨╜╨╜╤Л╤Е	╨б╨╛╨╖╨┤╨░╤В╤М ╨╕ ╨╜╨░╤Б╤В╤А╨╛╨╕╤В╤М ╤Б╤Е╨╡╨╝╤Г ╨▒╨░╨╖╤Л ╨┤╨░╨╜╨╜╤Л╤Е	PR	2023-05-27 09:42:06.762163	1
3	╨а╨░╨╖╤А╨░╨▒╨╛╤В╨║╨░ API	╨б╨╛╨╖╨┤╨░╤В╤М RESTful API ╨┤╨╗╤П ╨▓╨╖╨░╨╕╨╝╨╛╨┤╨╡╨╣╤Б╤В╨▓╨╕╤П ╤Б ╨║╨╗╨╕╨╡╨╜╤В╤Б╨║╨╕╨╝╨╕ ╨┐╤А╨╕╨╗╨╛╨╢╨╡╨╜╨╕╤П╨╝╨╕	PR	2023-05-27 09:42:06.762163	2
7	╨Ш╨╜╤В╨╡╨│╤А╨░╤Ж╨╕╤П ╤Б ╤Б╨╡╤А╨▓╨╕╤Б╨░╨╝╨╕	╨Ш╨╜╤В╨╡╨│╤А╨╕╤А╨╛╨▓╨░╤В╤М ╤Б╨╕╤Б╤В╨╡╨╝╤Г ╤Б ╨┐╨╗╨░╤В╨╡╨╢╨╜╤Л╨╝╨╕ ╤И╨╗╤О╨╖╨░╨╝╨╕ ╨╕ ╤Б╨╡╤А╨▓╨╕╤Б╨░╨╝╨╕ ╨░╨╜╨░╨╗╨╕╤В╨╕╨║╨╕	PR	2023-05-27 09:42:06.762163	4
9	╨Ю╨▒╨╜╨╛╨▓╨╗╨╡╨╜╨╕╨╡ ╨┤╨╛╨║╤Г╨╝╨╡╨╜╤В╨░╤Ж╨╕╨╕	╨Ю╨▒╨╜╨╛╨▓╨╕╤В╤М ╨┤╨╛╨║╤Г╨╝╨╡╨╜╤В╨░╤Ж╨╕╤О ╨┐╨╛ ╨┐╤А╨╛╨╡╨║╤В╤Г	CL	2023-05-27 09:42:06.762163	5
8	UI/UX ╨┤╨╕╨╖╨░╨╣╨╜	╨б╨╛╨╖╨┤╨░╤В╤М ╨┐╤А╨╕╨▓╨╗╨╡╨║╨░╤В╨╡╨╗╤М╨╜╤Л╨╣ ╨┐╨╛╨╗╤М╨╖╨╛╨▓╨░╤В╨╡╨╗╤М╤Б╨║╨╕╨╣ ╨╕╨╜╤В╨╡╤А╤Д╨╡╨╣╤Б	RE	2023-05-27 09:42:06.762163	4
10	╨Я╨╛╨┤╨│╨╛╤В╨╛╨▓╨║╨░ ╨║ ╤А╨╡╨╗╨╕╨╖╤Г	╨Я╤А╨╛╨▓╨╡╤Б╤В╨╕ ╤Д╨╕╨╜╨░╨╗╤М╨╜╤Л╨╡ ╨┐╤А╨╛╨▓╨╡╤А╨║╨╕ ╨┐╨╡╤А╨╡╨┤ ╨▓╤Л╨┐╤Г╤Б╨║╨╛╨╝ ╨╜╨╛╨▓╨╛╨╣ ╨▓╨╡╤А╤Б╨╕╨╕	RE	2023-05-27 09:42:06.762163	5
6	╨Ю╨┐╤В╨╕╨╝╨╕╨╖╨░╤Ж╨╕╤П ╨┐╤А╨╛╨╕╨╖╨▓╨╛╨┤╨╕╤В╨╡╨╗╤М╨╜╨╛╤Б╤В╨╕	╨г╨╗╤Г╤З╤И╨╕╤В╤М ╨┐╤А╨╛╨╕╨╖╨▓╨╛╨┤╨╕╤В╨╡╨╗╤М╨╜╨╛╤Б╤В╤М ╤Б╨╕╤Б╤В╨╡╨╝╤Л ╨┤╨╗╤П ╨╛╨▒╤А╨░╨▒╨╛╤В╨║╨╕ ╨▒╨╛╨╗╤М╤И╨╛╨│╨╛ ╨╛╨▒╤К╨╡╨╝╨░ ╨┤╨░╨╜╨╜╤Л╤Е	RE	2023-05-27 09:42:06.762163	3
4	╨Ф╨╛╨▒╨░╨▓╨╗╨╡╨╜╨╕╨╡ ╤Д╤Г╨╜╨║╤Ж╨╕╨╛╨╜╨░╨╗╤М╨╜╨╛╤Б╤В╨╕	╨а╨╡╨░╨╗╨╕╨╖╨╛╨▓╨░╤В╤М ╨▓╨╛╨╖╨╝╨╛╨╢╨╜╨╛╤Б╤В╤М ╨┤╨╛╨▒╨░╨▓╨╗╨╡╨╜╨╕╤П ╨║╨╛╨╝╨╝╨╡╨╜╤В╨░╤А╨╕╨╡╨▓ ╨║ ╨╖╨░╨┤╨░╤З╨░╨╝	PR	2023-05-27 09:42:06.762163	2
5	╨в╨╡╤Б╤В╨╕╤А╨╛╨▓╨░╨╜╨╕╨╡ ╨╕ ╨╛╤В╨╗╨░╨┤╨║╨░	╨Я╤А╨╛╨▓╨╡╤Б╤В╨╕ ╤В╨╡╤Б╤В╨╕╤А╨╛╨▓╨░╨╜╨╕╨╡ ╨╕ ╨╕╤Б╨┐╤А╨░╨▓╨╕╤В╤М ╨╛╨▒╨╜╨░╤А╤Г╨╢╨╡╨╜╨╜╤Л╨╡ ╨╛╤И╨╕╨▒╨║╨╕	CL	2023-05-27 09:42:06.762163	3
11	╨б╨┤╨░╤В╤М ╨║╤Г╤А╤Б╨░╤З	\N	RE	2023-05-27 11:13:03.600051	6
\.


--
-- Data for Name: team; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.team (id, name, direction, project, created_at) FROM stdin;
1	Team Alpha	DV	1	2023-05-27 09:42:06.762163
2	Data Scientists	DS	2	2023-05-27 09:42:06.762163
3	Testing Team	TS	3	2023-05-27 09:42:06.762163
4	Frontend Developers	DV	1	2023-05-27 09:42:06.762163
5	Backend Developers	DV	1	2023-05-27 09:42:06.762163
7	╨в╨╡╤Б╤В╨╛╨▓╨░╤П ╨Ъ╨╛╨╝╨░╨╜╨┤╨░	TS	6	2023-05-27 11:14:22.08483
\.


--
-- Data for Name: worker; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.worker (id, fio, login, email, contacts, post, team, experience, salary, hashpassword, created_at) FROM stdin;
1	╨Ш╨▓╨░╨╜ ╨Ш╨▓╨░╨╜╨╛╨▓	admin	admin@programodo.ru	+7-123-456-7890	CEO	\N	10	$2,000,000.00	14474e4033ac29cc	2023-05-27 09:42:06.762163
3	╨Ф╨╢╨╡╨╜ ╨Ф╨╛╨╣	JaneDoe	jane.doe@example.com	+7-234-567-8901	SDV	1	3	$80,000.00	3da1b283a57287bc	2023-05-27 09:42:06.762163
4	╨С╨╛╨▒ ╨Ф╨╢╨╛╨╜╤Б╨╛╨╜	BobJohnson	bob.johnson@example.com	+7-345-678-9012	JTS	3	1	$60,000.00	d6b2e886b8583050	2023-05-27 09:42:06.762163
5	╨Ь╨░╤А╨╕╤П ╨С╤А╨╛╨╜╨╡╨▓╨░	MaryBrown	mary.brown@example.com	+7-456-789-0123	SDS	2	2	$70,000.00	c280d9cd19528581	2023-05-27 09:42:06.762163
6	╨Я╨╕╤В╨╡╤А ╨Ы╨╕	PeterLee	peter.lee@example.com	+7-567-890-1234	JDS	1	4	$90,000.00	169e091f5475628d	2023-05-27 09:42:06.762163
7	╨б╨░╤А╨░ ╨Ъ╨╕╨╝	SaraKim	sara.kim@example.com	+7-678-901-2345	STS	3	2	$65,000.00	055284ed2240e2f1	2023-05-27 09:42:06.762163
8	╨Я╨░╤Г╨╗╤М ╨Ь╨╕╤В╤З╨╡╨╗	PaulMitchell	paul.mitchell@example.com	+1-789-012-3456	PJM	2	3	$75,000.00	e0587d2f35030d87	2023-05-27 09:42:06.762163
9	╨Ф╨░╨▓╨╕╨┤ ╨Ь╨╕╨╗╨╗╨╡╤А	DavidMiller	david.miller@example.com	+7-890-123-4567	PDM	3	4	$85,000.00	942945b2fe495b07	2023-05-27 09:42:06.762163
2	╨Ф╨╢╨╛╨╜ ╨б╨╝╨╕╤В	JohnSmith	john.smith@example.com	+7-123-456-7890	JDV	3	5	$100,000.00	799fd8eec67c6612	2023-05-27 09:42:06.762163
\.


--
-- Name: client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.client_id_seq', 7, true);


--
-- Name: comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.comment_id_seq', 7, true);


--
-- Name: log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.log_id_seq', 12, true);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.product_id_seq', 6, true);


--
-- Name: productclient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.productclient_id_seq', 7, true);


--
-- Name: project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.project_id_seq', 6, true);


--
-- Name: task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.task_id_seq', 11, true);


--
-- Name: team_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.team_id_seq', 7, true);


--
-- Name: worker_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.worker_id_seq', 9, true);


--
-- Name: client client_email_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_email_key UNIQUE (email);


--
-- Name: client client_login_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_login_key UNIQUE (login);


--
-- Name: client client_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (id);


--
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (id);


--
-- Name: log log_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.log
    ADD CONSTRAINT log_pkey PRIMARY KEY (id);


--
-- Name: product product_name_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_name_key UNIQUE (name);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: productclient productclient_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.productclient
    ADD CONSTRAINT productclient_pkey PRIMARY KEY (id);


--
-- Name: project project_name_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_name_key UNIQUE (name);


--
-- Name: project project_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_pkey PRIMARY KEY (id);


--
-- Name: task task_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (id);


--
-- Name: team team_name_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_name_key UNIQUE (name);


--
-- Name: team team_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_pkey PRIMARY KEY (id);


--
-- Name: worker worker_email_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.worker
    ADD CONSTRAINT worker_email_key UNIQUE (email);


--
-- Name: worker worker_login_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.worker
    ADD CONSTRAINT worker_login_key UNIQUE (login);


--
-- Name: worker worker_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.worker
    ADD CONSTRAINT worker_pkey PRIMARY KEY (id);


--
-- Name: comment comment_productclient_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_productclient_fkey FOREIGN KEY (productclient) REFERENCES public.productclient(id) ON DELETE CASCADE;


--
-- Name: log log_task_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.log
    ADD CONSTRAINT log_task_fkey FOREIGN KEY (task) REFERENCES public.task(id) ON DELETE SET NULL;


--
-- Name: log log_worker_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.log
    ADD CONSTRAINT log_worker_fkey FOREIGN KEY (worker) REFERENCES public.worker(id) ON DELETE SET NULL;


--
-- Name: productclient productclient_client_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.productclient
    ADD CONSTRAINT productclient_client_fkey FOREIGN KEY (client) REFERENCES public.client(id) ON DELETE CASCADE;


--
-- Name: productclient productclient_product_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.productclient
    ADD CONSTRAINT productclient_product_fkey FOREIGN KEY (product) REFERENCES public.product(id) ON DELETE CASCADE;


--
-- Name: project project_product_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_product_fkey FOREIGN KEY (product) REFERENCES public.product(id) ON DELETE SET NULL;


--
-- Name: task task_project_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_project_fkey FOREIGN KEY (project) REFERENCES public.project(id) ON DELETE CASCADE;


--
-- Name: team team_project_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_project_fkey FOREIGN KEY (project) REFERENCES public.project(id) ON DELETE SET NULL;


--
-- Name: worker worker_team_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.worker
    ADD CONSTRAINT worker_team_fkey FOREIGN KEY (team) REFERENCES public.team(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

