PGDMP     $                    {        	   ProjektBD    15.2 (Ubuntu 15.2-1)    15.2 (Ubuntu 15.2-1) �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16389 	   ProjektBD    DATABASE     w   CREATE DATABASE "ProjektBD" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'pl_PL.UTF-8';
    DROP DATABASE "ProjektBD";
                postgres    false            �            1259    16687    appusers    TABLE     ~  CREATE TABLE public.appusers (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    surname character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(1000) NOT NULL,
    class character varying(100) DEFAULT 'user'::character varying NOT NULL,
    status character varying(100) DEFAULT 'active'::character varying
);
    DROP TABLE public.appusers;
       public         heap    barte    false            �            1259    16694    appusers_id_seq    SEQUENCE     x   CREATE SEQUENCE public.appusers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.appusers_id_seq;
       public          barte    false    214            �           0    0    appusers_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.appusers_id_seq OWNED BY public.appusers.id;
          public          barte    false    215            �            1259    16695    case_documents    TABLE     �   CREATE TABLE public.case_documents (
    id_casdoc bigint NOT NULL,
    id_case_casdoc bigint NOT NULL,
    id_document_casdoc bigint NOT NULL
);
 "   DROP TABLE public.case_documents;
       public         heap    postgres    false            �            1259    16698    case_document_id_casdoc_seq    SEQUENCE     �   CREATE SEQUENCE public.case_document_id_casdoc_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.case_document_id_casdoc_seq;
       public          postgres    false    216            �           0    0    case_document_id_casdoc_seq    SEQUENCE OWNED BY     \   ALTER SEQUENCE public.case_document_id_casdoc_seq OWNED BY public.case_documents.id_casdoc;
          public          postgres    false    217            �            1259    16699 
   case_group    TABLE     �   CREATE TABLE public.case_group (
    id_casgrup bigint NOT NULL,
    id_case_casgrup bigint NOT NULL,
    id_group_casgrup bigint NOT NULL
);
    DROP TABLE public.case_group;
       public         heap    postgres    false            �            1259    16702    case_group_id_casgrup_seq    SEQUENCE     �   CREATE SEQUENCE public.case_group_id_casgrup_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.case_group_id_casgrup_seq;
       public          postgres    false    218            �           0    0    case_group_id_casgrup_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.case_group_id_casgrup_seq OWNED BY public.case_group.id_casgrup;
          public          postgres    false    219            �            1259    16703    casefile    TABLE     %  CREATE TABLE public.casefile (
    id_case bigint NOT NULL,
    opis_case character varying(1000) NOT NULL,
    id_group_case bigint,
    id_user_case bigint NOT NULL,
    title_case character varying(100) NOT NULL,
    status_case character varying(50) DEFAULT 'active'::character varying
);
    DROP TABLE public.casefile;
       public         heap    postgres    false            �            1259    16708    case_id_case_seq    SEQUENCE     y   CREATE SEQUENCE public.case_id_case_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.case_id_case_seq;
       public          postgres    false    220            �           0    0    case_id_case_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.case_id_case_seq OWNED BY public.casefile.id_case;
          public          postgres    false    221            �            1259    24977 	   case_path    TABLE     �   CREATE TABLE public.case_path (
    id_caspat bigint NOT NULL,
    id_case_caspat bigint NOT NULL,
    id_path_caspat bigint NOT NULL
);
    DROP TABLE public.case_path;
       public         heap    postgres    false            �            1259    24976    case_path_id_caspat_seq    SEQUENCE     �   CREATE SEQUENCE public.case_path_id_caspat_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.case_path_id_caspat_seq;
       public          postgres    false    249            �           0    0    case_path_id_caspat_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.case_path_id_caspat_seq OWNED BY public.case_path.id_caspat;
          public          postgres    false    248            �            1259    16709 	   case_user    TABLE     �   CREATE TABLE public.case_user (
    id_casusr bigint NOT NULL,
    id_case_casusr bigint NOT NULL,
    id_user_casusr bigint NOT NULL
);
    DROP TABLE public.case_user;
       public         heap    postgres    false            �            1259    16712    case_user_id_casusr_seq    SEQUENCE     �   CREATE SEQUENCE public.case_user_id_casusr_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.case_user_id_casusr_seq;
       public          postgres    false    222            �           0    0    case_user_id_casusr_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.case_user_id_casusr_seq OWNED BY public.case_user.id_casusr;
          public          postgres    false    223            �            1259    16713    casefavourites    TABLE     �   CREATE TABLE public.casefavourites (
    id_casfav bigint NOT NULL,
    id_case_casfav bigint NOT NULL,
    id_user_casfav bigint NOT NULL
);
 "   DROP TABLE public.casefavourites;
       public         heap    postgres    false            �            1259    16716    casefavourites_id_casfav_seq    SEQUENCE     �   CREATE SEQUENCE public.casefavourites_id_casfav_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.casefavourites_id_casfav_seq;
       public          postgres    false    224            �           0    0    casefavourites_id_casfav_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.casefavourites_id_casfav_seq OWNED BY public.casefavourites.id_casfav;
          public          postgres    false    225            �            1259    16717    document_owner    TABLE     �   CREATE TABLE public.document_owner (
    id_owner_docown bigint NOT NULL,
    id_document_docown bigint NOT NULL,
    id_user_docown bigint NOT NULL
);
 "   DROP TABLE public.document_owner;
       public         heap    postgres    false            �            1259    16720    document_owner_doc_owner_id_seq    SEQUENCE     �   CREATE SEQUENCE public.document_owner_doc_owner_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.document_owner_doc_owner_id_seq;
       public          postgres    false    226            �           0    0    document_owner_doc_owner_id_seq    SEQUENCE OWNED BY     f   ALTER SEQUENCE public.document_owner_doc_owner_id_seq OWNED BY public.document_owner.id_owner_docown;
          public          postgres    false    227            �            1259    16721 	   documents    TABLE     �   CREATE TABLE public.documents (
    id_document bigint NOT NULL,
    title_document character varying(100) NOT NULL,
    note_document character varying(1000),
    date_document timestamp(6) with time zone NOT NULL,
    id_file_document bigint
);
    DROP TABLE public.documents;
       public         heap    postgres    false            �            1259    16726    documents_document_id_seq    SEQUENCE     �   CREATE SEQUENCE public.documents_document_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.documents_document_id_seq;
       public          postgres    false    228            �           0    0    documents_document_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.documents_document_id_seq OWNED BY public.documents.id_document;
          public          postgres    false    229            �            1259    16727    file_archive_del    TABLE     �   CREATE TABLE public.file_archive_del (
    id_arch_filarchdel bigint NOT NULL,
    date_arch_filarchdel timestamp(6) with time zone NOT NULL,
    id_user_arch_filarchdel bigint NOT NULL,
    id_file_filarchdel bigint NOT NULL
);
 $   DROP TABLE public.file_archive_del;
       public         heap    barte    false            �            1259    16730     file_archive_id_file_archive_seq    SEQUENCE     �   CREATE SEQUENCE public.file_archive_id_file_archive_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.file_archive_id_file_archive_seq;
       public          barte    false    230            �           0    0     file_archive_id_file_archive_seq    SEQUENCE OWNED BY     l   ALTER SEQUENCE public.file_archive_id_file_archive_seq OWNED BY public.file_archive_del.id_arch_filarchdel;
          public          barte    false    231            �            1259    16731 
   file_owner    TABLE     �   CREATE TABLE public.file_owner (
    id_owner_filown bigint NOT NULL,
    id_user_filown integer NOT NULL,
    id_file_filown integer NOT NULL
);
    DROP TABLE public.file_owner;
       public         heap    barte    false            �            1259    16734    files    TABLE     (  CREATE TABLE public.files (
    id_file bigint NOT NULL,
    name_file character varying(100) NOT NULL,
    hashed_name_file character varying(300) NOT NULL,
    upload_timestamp timestamp(6) with time zone NOT NULL,
    size_file bigint NOT NULL,
    type_file character varying(10) NOT NULL
);
    DROP TABLE public.files;
       public         heap    barte    false            �            1259    16737    files_id_file_seq    SEQUENCE     z   CREATE SEQUENCE public.files_id_file_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.files_id_file_seq;
       public          barte    false    233            �           0    0    files_id_file_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.files_id_file_seq OWNED BY public.files.id_file;
          public          barte    false    234            �            1259    16738    groups    TABLE     �   CREATE TABLE public.groups (
    id_group bigint NOT NULL,
    name_group character varying(100) NOT NULL,
    creator_group bigint NOT NULL
);
    DROP TABLE public.groups;
       public         heap    postgres    false            �            1259    16741    group_id_group_seq    SEQUENCE     {   CREATE SEQUENCE public.group_id_group_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.group_id_group_seq;
       public          postgres    false    235            �           0    0    group_id_group_seq    SEQUENCE OWNED BY     J   ALTER SEQUENCE public.group_id_group_seq OWNED BY public.groups.id_group;
          public          postgres    false    236            �            1259    16742    group_users    TABLE     �   CREATE TABLE public.group_users (
    id_grpusr bigint NOT NULL,
    id_group_grpusr bigint NOT NULL,
    id_user_grpusr bigint NOT NULL
);
    DROP TABLE public.group_users;
       public         heap    postgres    false            �            1259    16745    group_users_id_grpusr_seq    SEQUENCE     �   CREATE SEQUENCE public.group_users_id_grpusr_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.group_users_id_grpusr_seq;
       public          postgres    false    237            �           0    0    group_users_id_grpusr_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.group_users_id_grpusr_seq OWNED BY public.group_users.id_grpusr;
          public          postgres    false    238            �            1259    24948 	   jump_path    TABLE     �   CREATE TABLE public.jump_path (
    id_jumpath bigint NOT NULL,
    id_way_jumpath bigint,
    id_child_jumpath bigint,
    id_parent_jumpath bigint,
    is_active_jumpath character varying(100) DEFAULT 'active'::character varying
);
    DROP TABLE public.jump_path;
       public         heap    postgres    false            �            1259    24947    jump_path_id_jumpath_seq    SEQUENCE     �   CREATE SEQUENCE public.jump_path_id_jumpath_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.jump_path_id_jumpath_seq;
       public          postgres    false    245            �           0    0    jump_path_id_jumpath_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.jump_path_id_jumpath_seq OWNED BY public.jump_path.id_jumpath;
          public          postgres    false    244            �            1259    16746    owners_id_owner_seq    SEQUENCE     |   CREATE SEQUENCE public.owners_id_owner_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.owners_id_owner_seq;
       public          barte    false    232            �           0    0    owners_id_owner_seq    SEQUENCE OWNED BY     V   ALTER SEQUENCE public.owners_id_owner_seq OWNED BY public.file_owner.id_owner_filown;
          public          barte    false    239            �            1259    24939    path    TABLE     �   CREATE TABLE public.path (
    id_path bigint NOT NULL,
    name_path character varying(100) NOT NULL,
    creator_path bigint NOT NULL,
    opis_path character varying(1000)
);
    DROP TABLE public.path;
       public         heap    postgres    false            �            1259    24938    path_id_path_seq    SEQUENCE     y   CREATE SEQUENCE public.path_id_path_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.path_id_path_seq;
       public          postgres    false    243            �           0    0    path_id_path_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.path_id_path_seq OWNED BY public.path.id_path;
          public          postgres    false    242            �            1259    24955    prefix_path    TABLE     �   CREATE TABLE public.prefix_path (
    id_patpref bigint NOT NULL,
    id_prefix_patpref bigint NOT NULL,
    id_group_patpref bigint NOT NULL,
    step_number_patpref bigint
);
    DROP TABLE public.prefix_path;
       public         heap    postgres    false            �            1259    24954    prefix_path_id_patpref_seq    SEQUENCE     �   CREATE SEQUENCE public.prefix_path_id_patpref_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.prefix_path_id_patpref_seq;
       public          postgres    false    247            �           0    0    prefix_path_id_patpref_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.prefix_path_id_patpref_seq OWNED BY public.prefix_path.id_patpref;
          public          postgres    false    246            �            1259    16747    users_archive_del    TABLE     �   CREATE TABLE public.users_archive_del (
    id_arch_usrarchdel bigint NOT NULL,
    date_arch_usrarchdel timestamp(6) with time zone NOT NULL,
    id_user_arch_usrarchdel bigint NOT NULL
);
 %   DROP TABLE public.users_archive_del;
       public         heap    postgres    false            �            1259    16750 (   users_archive_del_id_arch_usrarchdel_seq    SEQUENCE     �   CREATE SEQUENCE public.users_archive_del_id_arch_usrarchdel_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ?   DROP SEQUENCE public.users_archive_del_id_arch_usrarchdel_seq;
       public          postgres    false    240            �           0    0 (   users_archive_del_id_arch_usrarchdel_seq    SEQUENCE OWNED BY     u   ALTER SEQUENCE public.users_archive_del_id_arch_usrarchdel_seq OWNED BY public.users_archive_del.id_arch_usrarchdel;
          public          postgres    false    241            �           2604    24962    appusers id    DEFAULT     j   ALTER TABLE ONLY public.appusers ALTER COLUMN id SET DEFAULT nextval('public.appusers_id_seq'::regclass);
 :   ALTER TABLE public.appusers ALTER COLUMN id DROP DEFAULT;
       public          barte    false    215    214            �           2604    24963    case_documents id_casdoc    DEFAULT     �   ALTER TABLE ONLY public.case_documents ALTER COLUMN id_casdoc SET DEFAULT nextval('public.case_document_id_casdoc_seq'::regclass);
 G   ALTER TABLE public.case_documents ALTER COLUMN id_casdoc DROP DEFAULT;
       public          postgres    false    217    216            �           2604    24964    case_group id_casgrup    DEFAULT     ~   ALTER TABLE ONLY public.case_group ALTER COLUMN id_casgrup SET DEFAULT nextval('public.case_group_id_casgrup_seq'::regclass);
 D   ALTER TABLE public.case_group ALTER COLUMN id_casgrup DROP DEFAULT;
       public          postgres    false    219    218            �           2604    24980    case_path id_caspat    DEFAULT     z   ALTER TABLE ONLY public.case_path ALTER COLUMN id_caspat SET DEFAULT nextval('public.case_path_id_caspat_seq'::regclass);
 B   ALTER TABLE public.case_path ALTER COLUMN id_caspat DROP DEFAULT;
       public          postgres    false    249    248    249            �           2604    24965    case_user id_casusr    DEFAULT     z   ALTER TABLE ONLY public.case_user ALTER COLUMN id_casusr SET DEFAULT nextval('public.case_user_id_casusr_seq'::regclass);
 B   ALTER TABLE public.case_user ALTER COLUMN id_casusr DROP DEFAULT;
       public          postgres    false    223    222            �           2604    24966    casefavourites id_casfav    DEFAULT     �   ALTER TABLE ONLY public.casefavourites ALTER COLUMN id_casfav SET DEFAULT nextval('public.casefavourites_id_casfav_seq'::regclass);
 G   ALTER TABLE public.casefavourites ALTER COLUMN id_casfav DROP DEFAULT;
       public          postgres    false    225    224            �           2604    24967    casefile id_case    DEFAULT     p   ALTER TABLE ONLY public.casefile ALTER COLUMN id_case SET DEFAULT nextval('public.case_id_case_seq'::regclass);
 ?   ALTER TABLE public.casefile ALTER COLUMN id_case DROP DEFAULT;
       public          postgres    false    221    220            �           2604    24968    document_owner id_owner_docown    DEFAULT     �   ALTER TABLE ONLY public.document_owner ALTER COLUMN id_owner_docown SET DEFAULT nextval('public.document_owner_doc_owner_id_seq'::regclass);
 M   ALTER TABLE public.document_owner ALTER COLUMN id_owner_docown DROP DEFAULT;
       public          postgres    false    227    226            �           2604    24969    documents id_document    DEFAULT     ~   ALTER TABLE ONLY public.documents ALTER COLUMN id_document SET DEFAULT nextval('public.documents_document_id_seq'::regclass);
 D   ALTER TABLE public.documents ALTER COLUMN id_document DROP DEFAULT;
       public          postgres    false    229    228            �           2604    24970 #   file_archive_del id_arch_filarchdel    DEFAULT     �   ALTER TABLE ONLY public.file_archive_del ALTER COLUMN id_arch_filarchdel SET DEFAULT nextval('public.file_archive_id_file_archive_seq'::regclass);
 R   ALTER TABLE public.file_archive_del ALTER COLUMN id_arch_filarchdel DROP DEFAULT;
       public          barte    false    231    230            �           2604    24971    file_owner id_owner_filown    DEFAULT     }   ALTER TABLE ONLY public.file_owner ALTER COLUMN id_owner_filown SET DEFAULT nextval('public.owners_id_owner_seq'::regclass);
 I   ALTER TABLE public.file_owner ALTER COLUMN id_owner_filown DROP DEFAULT;
       public          barte    false    239    232            �           2604    24972    files id_file    DEFAULT     n   ALTER TABLE ONLY public.files ALTER COLUMN id_file SET DEFAULT nextval('public.files_id_file_seq'::regclass);
 <   ALTER TABLE public.files ALTER COLUMN id_file DROP DEFAULT;
       public          barte    false    234    233            �           2604    24973    group_users id_grpusr    DEFAULT     ~   ALTER TABLE ONLY public.group_users ALTER COLUMN id_grpusr SET DEFAULT nextval('public.group_users_id_grpusr_seq'::regclass);
 D   ALTER TABLE public.group_users ALTER COLUMN id_grpusr DROP DEFAULT;
       public          postgres    false    238    237            �           2604    24974    groups id_group    DEFAULT     q   ALTER TABLE ONLY public.groups ALTER COLUMN id_group SET DEFAULT nextval('public.group_id_group_seq'::regclass);
 >   ALTER TABLE public.groups ALTER COLUMN id_group DROP DEFAULT;
       public          postgres    false    236    235            �           2604    24951    jump_path id_jumpath    DEFAULT     |   ALTER TABLE ONLY public.jump_path ALTER COLUMN id_jumpath SET DEFAULT nextval('public.jump_path_id_jumpath_seq'::regclass);
 C   ALTER TABLE public.jump_path ALTER COLUMN id_jumpath DROP DEFAULT;
       public          postgres    false    245    244    245            �           2604    24942    path id_path    DEFAULT     l   ALTER TABLE ONLY public.path ALTER COLUMN id_path SET DEFAULT nextval('public.path_id_path_seq'::regclass);
 ;   ALTER TABLE public.path ALTER COLUMN id_path DROP DEFAULT;
       public          postgres    false    242    243    243            �           2604    24958    prefix_path id_patpref    DEFAULT     �   ALTER TABLE ONLY public.prefix_path ALTER COLUMN id_patpref SET DEFAULT nextval('public.prefix_path_id_patpref_seq'::regclass);
 E   ALTER TABLE public.prefix_path ALTER COLUMN id_patpref DROP DEFAULT;
       public          postgres    false    247    246    247            �           2604    24975 $   users_archive_del id_arch_usrarchdel    DEFAULT     �   ALTER TABLE ONLY public.users_archive_del ALTER COLUMN id_arch_usrarchdel SET DEFAULT nextval('public.users_archive_del_id_arch_usrarchdel_seq'::regclass);
 S   ALTER TABLE public.users_archive_del ALTER COLUMN id_arch_usrarchdel DROP DEFAULT;
       public          postgres    false    241    240            �          0    16687    appusers 
   TABLE DATA           U   COPY public.appusers (id, name, surname, email, password, class, status) FROM stdin;
    public          barte    false    214   ��       �          0    16695    case_documents 
   TABLE DATA           W   COPY public.case_documents (id_casdoc, id_case_casdoc, id_document_casdoc) FROM stdin;
    public          postgres    false    216   ��       �          0    16699 
   case_group 
   TABLE DATA           S   COPY public.case_group (id_casgrup, id_case_casgrup, id_group_casgrup) FROM stdin;
    public          postgres    false    218   �       �          0    24977 	   case_path 
   TABLE DATA           N   COPY public.case_path (id_caspat, id_case_caspat, id_path_caspat) FROM stdin;
    public          postgres    false    249   E�       �          0    16709 	   case_user 
   TABLE DATA           N   COPY public.case_user (id_casusr, id_case_casusr, id_user_casusr) FROM stdin;
    public          postgres    false    222   h�       �          0    16713    casefavourites 
   TABLE DATA           S   COPY public.casefavourites (id_casfav, id_case_casfav, id_user_casfav) FROM stdin;
    public          postgres    false    224   ��       �          0    16703    casefile 
   TABLE DATA           l   COPY public.casefile (id_case, opis_case, id_group_case, id_user_case, title_case, status_case) FROM stdin;
    public          postgres    false    220   ��       �          0    16717    document_owner 
   TABLE DATA           ]   COPY public.document_owner (id_owner_docown, id_document_docown, id_user_docown) FROM stdin;
    public          postgres    false    226   ��       �          0    16721 	   documents 
   TABLE DATA           p   COPY public.documents (id_document, title_document, note_document, date_document, id_file_document) FROM stdin;
    public          postgres    false    228   ַ       �          0    16727    file_archive_del 
   TABLE DATA           �   COPY public.file_archive_del (id_arch_filarchdel, date_arch_filarchdel, id_user_arch_filarchdel, id_file_filarchdel) FROM stdin;
    public          barte    false    230   ��       �          0    16731 
   file_owner 
   TABLE DATA           U   COPY public.file_owner (id_owner_filown, id_user_filown, id_file_filown) FROM stdin;
    public          barte    false    232   ��       �          0    16734    files 
   TABLE DATA           m   COPY public.files (id_file, name_file, hashed_name_file, upload_timestamp, size_file, type_file) FROM stdin;
    public          barte    false    233   #�       �          0    16742    group_users 
   TABLE DATA           Q   COPY public.group_users (id_grpusr, id_group_grpusr, id_user_grpusr) FROM stdin;
    public          postgres    false    237   P�       �          0    16738    groups 
   TABLE DATA           E   COPY public.groups (id_group, name_group, creator_group) FROM stdin;
    public          postgres    false    235   ��       �          0    24948 	   jump_path 
   TABLE DATA           w   COPY public.jump_path (id_jumpath, id_way_jumpath, id_child_jumpath, id_parent_jumpath, is_active_jumpath) FROM stdin;
    public          postgres    false    245   һ       �          0    24939    path 
   TABLE DATA           K   COPY public.path (id_path, name_path, creator_path, opis_path) FROM stdin;
    public          postgres    false    243   ��       �          0    24955    prefix_path 
   TABLE DATA           k   COPY public.prefix_path (id_patpref, id_prefix_patpref, id_group_patpref, step_number_patpref) FROM stdin;
    public          postgres    false    247   Q�       �          0    16747    users_archive_del 
   TABLE DATA           n   COPY public.users_archive_del (id_arch_usrarchdel, date_arch_usrarchdel, id_user_arch_usrarchdel) FROM stdin;
    public          postgres    false    240   ��       �           0    0    appusers_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.appusers_id_seq', 16, true);
          public          barte    false    215            �           0    0    case_document_id_casdoc_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.case_document_id_casdoc_seq', 23, true);
          public          postgres    false    217            �           0    0    case_group_id_casgrup_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.case_group_id_casgrup_seq', 3, true);
          public          postgres    false    219            �           0    0    case_id_case_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.case_id_case_seq', 13, true);
          public          postgres    false    221            �           0    0    case_path_id_caspat_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.case_path_id_caspat_seq', 1, true);
          public          postgres    false    248            �           0    0    case_user_id_casusr_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.case_user_id_casusr_seq', 6, true);
          public          postgres    false    223            �           0    0    casefavourites_id_casfav_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.casefavourites_id_casfav_seq', 1, false);
          public          postgres    false    225            �           0    0    document_owner_doc_owner_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.document_owner_doc_owner_id_seq', 85, true);
          public          postgres    false    227            �           0    0    documents_document_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.documents_document_id_seq', 65, true);
          public          postgres    false    229            �           0    0     file_archive_id_file_archive_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.file_archive_id_file_archive_seq', 15, true);
          public          barte    false    231            �           0    0    files_id_file_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.files_id_file_seq', 88, true);
          public          barte    false    234            �           0    0    group_id_group_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.group_id_group_seq', 5, true);
          public          postgres    false    236            �           0    0    group_users_id_grpusr_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.group_users_id_grpusr_seq', 7, true);
          public          postgres    false    238            �           0    0    jump_path_id_jumpath_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.jump_path_id_jumpath_seq', 2, true);
          public          postgres    false    244            �           0    0    owners_id_owner_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.owners_id_owner_seq', 93, true);
          public          barte    false    239            �           0    0    path_id_path_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.path_id_path_seq', 2, true);
          public          postgres    false    242            �           0    0    prefix_path_id_patpref_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.prefix_path_id_patpref_seq', 16, true);
          public          postgres    false    246            �           0    0 (   users_archive_del_id_arch_usrarchdel_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public.users_archive_del_id_arch_usrarchdel_seq', 23, true);
          public          postgres    false    241            �           2606    16766    appusers appusers_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.appusers
    ADD CONSTRAINT appusers_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.appusers DROP CONSTRAINT appusers_pkey;
       public            barte    false    214            �           2606    16768 "   case_documents case_documents_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.case_documents
    ADD CONSTRAINT case_documents_pkey PRIMARY KEY (id_casdoc);
 L   ALTER TABLE ONLY public.case_documents DROP CONSTRAINT case_documents_pkey;
       public            postgres    false    216            �           2606    16770    case_group case_group_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.case_group
    ADD CONSTRAINT case_group_pkey PRIMARY KEY (id_casgrup);
 D   ALTER TABLE ONLY public.case_group DROP CONSTRAINT case_group_pkey;
       public            postgres    false    218                       2606    24982    case_path case_path_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.case_path
    ADD CONSTRAINT case_path_pkey PRIMARY KEY (id_caspat);
 B   ALTER TABLE ONLY public.case_path DROP CONSTRAINT case_path_pkey;
       public            postgres    false    249            �           2606    16772    casefile case_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.casefile
    ADD CONSTRAINT case_pkey PRIMARY KEY (id_case);
 <   ALTER TABLE ONLY public.casefile DROP CONSTRAINT case_pkey;
       public            postgres    false    220            �           2606    16774    case_user case_user_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.case_user
    ADD CONSTRAINT case_user_pkey PRIMARY KEY (id_casusr);
 B   ALTER TABLE ONLY public.case_user DROP CONSTRAINT case_user_pkey;
       public            postgres    false    222            �           2606    16776 "   casefavourites casefavourites_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.casefavourites
    ADD CONSTRAINT casefavourites_pkey PRIMARY KEY (id_casfav);
 L   ALTER TABLE ONLY public.casefavourites DROP CONSTRAINT casefavourites_pkey;
       public            postgres    false    224            �           2606    16778 "   document_owner document_owner_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.document_owner
    ADD CONSTRAINT document_owner_pkey PRIMARY KEY (id_owner_docown);
 L   ALTER TABLE ONLY public.document_owner DROP CONSTRAINT document_owner_pkey;
       public            postgres    false    226            �           2606    16780    documents documents_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id_document);
 B   ALTER TABLE ONLY public.documents DROP CONSTRAINT documents_pkey;
       public            postgres    false    228            �           2606    16782 "   file_archive_del file_archive_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.file_archive_del
    ADD CONSTRAINT file_archive_pkey PRIMARY KEY (id_arch_filarchdel);
 L   ALTER TABLE ONLY public.file_archive_del DROP CONSTRAINT file_archive_pkey;
       public            barte    false    230            �           2606    16784    files files_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id_file);
 :   ALTER TABLE ONLY public.files DROP CONSTRAINT files_pkey;
       public            barte    false    233                       2606    16786    groups group_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT group_pkey PRIMARY KEY (id_group);
 ;   ALTER TABLE ONLY public.groups DROP CONSTRAINT group_pkey;
       public            postgres    false    235                       2606    16788    group_users group_users_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.group_users
    ADD CONSTRAINT group_users_pkey PRIMARY KEY (id_grpusr);
 F   ALTER TABLE ONLY public.group_users DROP CONSTRAINT group_users_pkey;
       public            postgres    false    237            	           2606    24953    jump_path jump_path_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.jump_path
    ADD CONSTRAINT jump_path_pkey PRIMARY KEY (id_jumpath);
 B   ALTER TABLE ONLY public.jump_path DROP CONSTRAINT jump_path_pkey;
       public            postgres    false    245            �           2606    16790    file_owner owners_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.file_owner
    ADD CONSTRAINT owners_pkey PRIMARY KEY (id_owner_filown);
 @   ALTER TABLE ONLY public.file_owner DROP CONSTRAINT owners_pkey;
       public            barte    false    232                       2606    24946    path path_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.path
    ADD CONSTRAINT path_pkey PRIMARY KEY (id_path);
 8   ALTER TABLE ONLY public.path DROP CONSTRAINT path_pkey;
       public            postgres    false    243                       2606    24960    prefix_path prefix_path_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.prefix_path
    ADD CONSTRAINT prefix_path_pkey PRIMARY KEY (id_patpref);
 F   ALTER TABLE ONLY public.prefix_path DROP CONSTRAINT prefix_path_pkey;
       public            postgres    false    247                       2606    16792 (   users_archive_del users_archive_del_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.users_archive_del
    ADD CONSTRAINT users_archive_del_pkey PRIMARY KEY (id_arch_usrarchdel);
 R   ALTER TABLE ONLY public.users_archive_del DROP CONSTRAINT users_archive_del_pkey;
       public            postgres    false    240                       2606    16793    groups creator_group_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT creator_group_fk FOREIGN KEY (creator_group) REFERENCES public.appusers(id) NOT VALID;
 A   ALTER TABLE ONLY public.groups DROP CONSTRAINT creator_group_fk;
       public          postgres    false    235    214    3307                       2606    16798     case_documents id_case_casdoc_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.case_documents
    ADD CONSTRAINT id_case_casdoc_fk FOREIGN KEY (id_case_casdoc) REFERENCES public.casefile(id_case) NOT VALID;
 J   ALTER TABLE ONLY public.case_documents DROP CONSTRAINT id_case_casdoc_fk;
       public          postgres    false    216    3313    220                       2606    16803     casefavourites id_case_casfav_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.casefavourites
    ADD CONSTRAINT id_case_casfav_fk FOREIGN KEY (id_case_casfav) REFERENCES public.casefile(id_case) NOT VALID;
 J   ALTER TABLE ONLY public.casefavourites DROP CONSTRAINT id_case_casfav_fk;
       public          postgres    false    224    220    3313                       2606    16808    case_group id_case_casgrup_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.case_group
    ADD CONSTRAINT id_case_casgrup_fk FOREIGN KEY (id_case_casgrup) REFERENCES public.casefile(id_case) NOT VALID;
 G   ALTER TABLE ONLY public.case_group DROP CONSTRAINT id_case_casgrup_fk;
       public          postgres    false    220    218    3313                       2606    16813    case_user id_case_casusr_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.case_user
    ADD CONSTRAINT id_case_casusr_fk FOREIGN KEY (id_case_casusr) REFERENCES public.casefile(id_case) NOT VALID;
 E   ALTER TABLE ONLY public.case_user DROP CONSTRAINT id_case_casusr_fk;
       public          postgres    false    220    222    3313                       2606    16818 $   case_documents id_document_casdoc_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.case_documents
    ADD CONSTRAINT id_document_casdoc_fk FOREIGN KEY (id_document_casdoc) REFERENCES public.documents(id_document) NOT VALID;
 N   ALTER TABLE ONLY public.case_documents DROP CONSTRAINT id_document_casdoc_fk;
       public          postgres    false    216    3321    228                       2606    16823 $   document_owner id_document_docown_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.document_owner
    ADD CONSTRAINT id_document_docown_fk FOREIGN KEY (id_document_docown) REFERENCES public.documents(id_document) NOT VALID;
 N   ALTER TABLE ONLY public.document_owner DROP CONSTRAINT id_document_docown_fk;
       public          postgres    false    226    3321    228                       2606    16828     file_archive_del id_file_arch_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.file_archive_del
    ADD CONSTRAINT id_file_arch_fk FOREIGN KEY (id_file_filarchdel) REFERENCES public.files(id_file) NOT VALID;
 J   ALTER TABLE ONLY public.file_archive_del DROP CONSTRAINT id_file_arch_fk;
       public          barte    false    233    3327    230                       2606    16833    casefile id_group_case_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.casefile
    ADD CONSTRAINT id_group_case_fk FOREIGN KEY (id_group_case) REFERENCES public.groups(id_group) NOT VALID;
 C   ALTER TABLE ONLY public.casefile DROP CONSTRAINT id_group_case_fk;
       public          postgres    false    235    3329    220                       2606    16838    case_group id_group_casgrup_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.case_group
    ADD CONSTRAINT id_group_casgrup_fk FOREIGN KEY (id_group_casgrup) REFERENCES public.groups(id_group) NOT VALID;
 H   ALTER TABLE ONLY public.case_group DROP CONSTRAINT id_group_casgrup_fk;
       public          postgres    false    3329    218    235                       2606    16843    group_users id_group_grpusr_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.group_users
    ADD CONSTRAINT id_group_grpusr_fk FOREIGN KEY (id_group_grpusr) REFERENCES public.groups(id_group) NOT VALID;
 H   ALTER TABLE ONLY public.group_users DROP CONSTRAINT id_group_grpusr_fk;
       public          postgres    false    3329    237    235                       2606    16848     file_archive_del id_user_arch_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.file_archive_del
    ADD CONSTRAINT id_user_arch_fk FOREIGN KEY (id_user_arch_filarchdel) REFERENCES public.appusers(id) NOT VALID;
 J   ALTER TABLE ONLY public.file_archive_del DROP CONSTRAINT id_user_arch_fk;
       public          barte    false    214    230    3307                       2606    16853    casefile id_user_case_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.casefile
    ADD CONSTRAINT id_user_case_fk FOREIGN KEY (id_user_case) REFERENCES public.appusers(id) NOT VALID;
 B   ALTER TABLE ONLY public.casefile DROP CONSTRAINT id_user_case_fk;
       public          postgres    false    214    220    3307                       2606    16858     casefavourites id_user_casfav_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.casefavourites
    ADD CONSTRAINT id_user_casfav_fk FOREIGN KEY (id_user_casfav) REFERENCES public.appusers(id) NOT VALID;
 J   ALTER TABLE ONLY public.casefavourites DROP CONSTRAINT id_user_casfav_fk;
       public          postgres    false    3307    214    224                       2606    16863    case_user id_user_casusr_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.case_user
    ADD CONSTRAINT id_user_casusr_fk FOREIGN KEY (id_user_casusr) REFERENCES public.appusers(id) NOT VALID;
 E   ALTER TABLE ONLY public.case_user DROP CONSTRAINT id_user_casusr_fk;
       public          postgres    false    3307    214    222                       2606    16868     document_owner id_user_docown_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.document_owner
    ADD CONSTRAINT id_user_docown_fk FOREIGN KEY (id_user_docown) REFERENCES public.appusers(id) NOT VALID;
 J   ALTER TABLE ONLY public.document_owner DROP CONSTRAINT id_user_docown_fk;
       public          postgres    false    226    3307    214                        2606    16873    group_users id_user_grpusr_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.group_users
    ADD CONSTRAINT id_user_grpusr_fk FOREIGN KEY (id_user_grpusr) REFERENCES public.appusers(id) NOT VALID;
 G   ALTER TABLE ONLY public.group_users DROP CONSTRAINT id_user_grpusr_fk;
       public          postgres    false    214    3307    237            !           2606    16878     users_archive_del id_userarch_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_archive_del
    ADD CONSTRAINT id_userarch_fk FOREIGN KEY (id_user_arch_usrarchdel) REFERENCES public.appusers(id);
 J   ALTER TABLE ONLY public.users_archive_del DROP CONSTRAINT id_userarch_fk;
       public          postgres    false    240    3307    214                       2606    16883    file_owner owners_id_file_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.file_owner
    ADD CONSTRAINT owners_id_file_fkey FOREIGN KEY (id_file_filown) REFERENCES public.files(id_file);
 H   ALTER TABLE ONLY public.file_owner DROP CONSTRAINT owners_id_file_fkey;
       public          barte    false    232    3327    233                       2606    16888    file_owner owners_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.file_owner
    ADD CONSTRAINT owners_id_user_fkey FOREIGN KEY (id_user_filown) REFERENCES public.appusers(id);
 H   ALTER TABLE ONLY public.file_owner DROP CONSTRAINT owners_id_user_fkey;
       public          barte    false    3307    214    232            �   �   x����
�@��wF��u�*L�]�q�Q�3פ��E�S�
Qd��s��fd!��*\�����T�45�O���)�]BI�E����?��&�R��zh���]�aE�"�SA�d�k=�|���*��bevM�rO���g�XZL �]%��E��*�����!�r��ϵ�'�x yy+      �   O   x����0�PLƒ|Ľ��:�x�� ]�d���,F�W���&-�AfC�6� �Bgm���ð�a�̄^j�eX��?h#      �      x�3�4�4�2�&\�@Ґ+F��� "��      �      x�3��4����� 	`      �   '   x�3�4�44�2�44�� .�	��c
4��1z\\\ ��w      �      x������ � �      �   �   x�U�K
�0���s1>P�ܴ��X
2�P�ДN���[x��Ѿ���o��@��|��WlMAȖ앁�Vߔ�C�Y�p��z�#�J�O�KZ@�iF�r*�8��/�K�C�����ँB�9}�Y�_X����b��a�&�P�V�s���1�1���*�Һ'�ƞj0�j��j��Kf�½���&!���c      �   ;   x�5��  ���0�Rz���T�e�r|@YTƂ����Q��8j��_��ո����      �   �   x�u�A�0���)v����ݦ;�H1��4���geEH�����S@�d�g�#[e��6Is�u�;;5�r`�6\��B ��*�	l��Ӈ�L)y����T���=#I��v�e�S����� j#���h��ɺ�C1��j�k�����F �LΉSJ��F7      �   M   x�eɱ�0�:�"=
�b<�ρ�,(���F��C���H[��������@������ɣ:����%�."7�b<      �   &   x��0�4�0�0�443�Af\�F��`�=... tc�      �     x�m�;nA���SL�vT�~To	X& AB���fm�]��Z�!�C �AJd_�^�F��&���U�'<���>m��w�Y��Cի��4�F\�;�R��}�f%�E�1��[��1��D>G�]��|����;��W �D�hv��P�7���r��~����ݯ��������땍�����߻����׺��7{�����9��r}�;��KMru�i��R�C��ħ�
y����M�֘�� NZ�i[��䲢8�yHñj!~��`�O����8�A3@+}tb�5�#F���;'�z��J ���T��D�\amd���#��(���S�n����浝-),�-����M"R��B�=־"K��=�h�g6�\["�V��h�CF��������G�G�8��}�x��-kvX4Ik��II�0 �����-��2T�Q�Ql^��s�aa"I���Dt�bex���usy���l���@�'(�H��N[3�Һ����/�A#tF�5������ 0NQ�������~���_@'�      �   .   x�3�4�4�2��\��� �Dq��Hc.KN# ��+F��� ��      �   4   x�3�I-.�4�23��Lc��4�0M�LS΀�Ԥb#= /F��� ��H      �      x�3�4�?���̲T�=... 1��      �   D   x�3�J?ڔ_\������X�X���i�EP������̒R.#�����l����������R�=... ���      �   ;   x����PB�P��YL����~8�����V(*��T9�jf���:l�����"�n0	|      �   �   x�e�A�0���W�0��[��w�6A���hva�@t���E�^�٘�y�|��
O���N��UҬ����&(��Ԍ=&��]��+<�4ۀV�]-����v���S���N�	�ϟ�b��� ������1���I�B|�ȴ����IDo�`M�     