PGDMP         ;                {        	   ProjektBD    15.2    15.2 0    /           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            0           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            1           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            2           1262    16399 	   ProjektBD    DATABASE     ~   CREATE DATABASE "ProjektBD" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Polish_Poland.1250';
    DROP DATABASE "ProjektBD";
                barte    false            �            1259    32835    appusers    TABLE     7  CREATE TABLE public.appusers (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    surname character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(1000) NOT NULL,
    class character varying(100) DEFAULT 'user'::character varying NOT NULL
);
    DROP TABLE public.appusers;
       public         heap    barte    false            �            1259    32841    appusers_id_seq    SEQUENCE     x   CREATE SEQUENCE public.appusers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.appusers_id_seq;
       public          barte    false    214            3           0    0    appusers_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.appusers_id_seq OWNED BY public.appusers.id;
          public          barte    false    215            �            1259    32886    document_owner    TABLE     �   CREATE TABLE public.document_owner (
    doc_owner_id bigint NOT NULL,
    document_id bigint NOT NULL,
    user_id bigint NOT NULL
);
 "   DROP TABLE public.document_owner;
       public         heap    postgres    false            �            1259    32885    document_owner_doc_owner_id_seq    SEQUENCE     �   CREATE SEQUENCE public.document_owner_doc_owner_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.document_owner_doc_owner_id_seq;
       public          postgres    false    225            4           0    0    document_owner_doc_owner_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.document_owner_doc_owner_id_seq OWNED BY public.document_owner.doc_owner_id;
          public          postgres    false    224            �            1259    32842 	   documents    TABLE     �   CREATE TABLE public.documents (
    document_id bigint NOT NULL,
    user_id bigint NOT NULL,
    document_title character varying(100) NOT NULL,
    note character varying(1000),
    date timestamp(6) with time zone NOT NULL,
    file_id bigint
);
    DROP TABLE public.documents;
       public         heap    postgres    false            �            1259    32847    documents_document_id_seq    SEQUENCE     �   CREATE SEQUENCE public.documents_document_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.documents_document_id_seq;
       public          postgres    false    216            5           0    0    documents_document_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.documents_document_id_seq OWNED BY public.documents.document_id;
          public          postgres    false    217            �            1259    32848    file_archive_del    TABLE     �   CREATE TABLE public.file_archive_del (
    id_file_archive bigint NOT NULL,
    date_arch timestamp(6) with time zone NOT NULL,
    id_user_arch bigint NOT NULL,
    file_id bigint NOT NULL
);
 $   DROP TABLE public.file_archive_del;
       public         heap    barte    false            �            1259    32851     file_archive_id_file_archive_seq    SEQUENCE     �   CREATE SEQUENCE public.file_archive_id_file_archive_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.file_archive_id_file_archive_seq;
       public          barte    false    218            6           0    0     file_archive_id_file_archive_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.file_archive_id_file_archive_seq OWNED BY public.file_archive_del.id_file_archive;
          public          barte    false    219            �            1259    32852    files    TABLE     (  CREATE TABLE public.files (
    id_file bigint NOT NULL,
    name_file character varying(100) NOT NULL,
    hashed_name_file character varying(300) NOT NULL,
    upload_timestamp timestamp(6) with time zone NOT NULL,
    size_file bigint NOT NULL,
    type_file character varying(10) NOT NULL
);
    DROP TABLE public.files;
       public         heap    barte    false            �            1259    32855    files_id_file_seq    SEQUENCE     z   CREATE SEQUENCE public.files_id_file_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.files_id_file_seq;
       public          barte    false    220            7           0    0    files_id_file_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.files_id_file_seq OWNED BY public.files.id_file;
          public          barte    false    221            �            1259    32856    owners    TABLE     y   CREATE TABLE public.owners (
    id_owner bigint NOT NULL,
    id_user integer NOT NULL,
    id_file integer NOT NULL
);
    DROP TABLE public.owners;
       public         heap    barte    false            �            1259    32859    owners_id_owner_seq    SEQUENCE     |   CREATE SEQUENCE public.owners_id_owner_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.owners_id_owner_seq;
       public          barte    false    222            8           0    0    owners_id_owner_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.owners_id_owner_seq OWNED BY public.owners.id_owner;
          public          barte    false    223            ~           2604    32892    appusers id    DEFAULT     j   ALTER TABLE ONLY public.appusers ALTER COLUMN id SET DEFAULT nextval('public.appusers_id_seq'::regclass);
 :   ALTER TABLE public.appusers ALTER COLUMN id DROP DEFAULT;
       public          barte    false    215    214            �           2604    32889    document_owner doc_owner_id    DEFAULT     �   ALTER TABLE ONLY public.document_owner ALTER COLUMN doc_owner_id SET DEFAULT nextval('public.document_owner_doc_owner_id_seq'::regclass);
 J   ALTER TABLE public.document_owner ALTER COLUMN doc_owner_id DROP DEFAULT;
       public          postgres    false    224    225    225            �           2604    32893    documents document_id    DEFAULT     ~   ALTER TABLE ONLY public.documents ALTER COLUMN document_id SET DEFAULT nextval('public.documents_document_id_seq'::regclass);
 D   ALTER TABLE public.documents ALTER COLUMN document_id DROP DEFAULT;
       public          postgres    false    217    216            �           2604    32894     file_archive_del id_file_archive    DEFAULT     �   ALTER TABLE ONLY public.file_archive_del ALTER COLUMN id_file_archive SET DEFAULT nextval('public.file_archive_id_file_archive_seq'::regclass);
 O   ALTER TABLE public.file_archive_del ALTER COLUMN id_file_archive DROP DEFAULT;
       public          barte    false    219    218            �           2604    32895    files id_file    DEFAULT     n   ALTER TABLE ONLY public.files ALTER COLUMN id_file SET DEFAULT nextval('public.files_id_file_seq'::regclass);
 <   ALTER TABLE public.files ALTER COLUMN id_file DROP DEFAULT;
       public          barte    false    221    220            �           2604    32896    owners id_owner    DEFAULT     r   ALTER TABLE ONLY public.owners ALTER COLUMN id_owner SET DEFAULT nextval('public.owners_id_owner_seq'::regclass);
 >   ALTER TABLE public.owners ALTER COLUMN id_owner DROP DEFAULT;
       public          barte    false    223    222            !          0    32835    appusers 
   TABLE DATA           M   COPY public.appusers (id, name, surname, email, password, class) FROM stdin;
    public          barte    false    214   ~6       ,          0    32886    document_owner 
   TABLE DATA           L   COPY public.document_owner (doc_owner_id, document_id, user_id) FROM stdin;
    public          postgres    false    225   �6       #          0    32842 	   documents 
   TABLE DATA           ^   COPY public.documents (document_id, user_id, document_title, note, date, file_id) FROM stdin;
    public          postgres    false    216   �6       %          0    32848    file_archive_del 
   TABLE DATA           ]   COPY public.file_archive_del (id_file_archive, date_arch, id_user_arch, file_id) FROM stdin;
    public          barte    false    218   k7       '          0    32852    files 
   TABLE DATA           m   COPY public.files (id_file, name_file, hashed_name_file, upload_timestamp, size_file, type_file) FROM stdin;
    public          barte    false    220   �7       )          0    32856    owners 
   TABLE DATA           <   COPY public.owners (id_owner, id_user, id_file) FROM stdin;
    public          barte    false    222   s8       9           0    0    appusers_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.appusers_id_seq', 5, true);
          public          barte    false    215            :           0    0    document_owner_doc_owner_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.document_owner_doc_owner_id_seq', 2, true);
          public          postgres    false    224            ;           0    0    documents_document_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.documents_document_id_seq', 14, true);
          public          postgres    false    217            <           0    0     file_archive_id_file_archive_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.file_archive_id_file_archive_seq', 8, true);
          public          barte    false    219            =           0    0    files_id_file_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.files_id_file_seq', 39, true);
          public          barte    false    221            >           0    0    owners_id_owner_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.owners_id_owner_seq', 26, true);
          public          barte    false    223            �           2606    32866    appusers appusers_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.appusers
    ADD CONSTRAINT appusers_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.appusers DROP CONSTRAINT appusers_pkey;
       public            barte    false    214            �           2606    32891 "   document_owner document_owner_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.document_owner
    ADD CONSTRAINT document_owner_pkey PRIMARY KEY (doc_owner_id);
 L   ALTER TABLE ONLY public.document_owner DROP CONSTRAINT document_owner_pkey;
       public            postgres    false    225            �           2606    32868    documents documents_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (document_id);
 B   ALTER TABLE ONLY public.documents DROP CONSTRAINT documents_pkey;
       public            postgres    false    216            �           2606    32870 "   file_archive_del file_archive_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.file_archive_del
    ADD CONSTRAINT file_archive_pkey PRIMARY KEY (id_file_archive);
 L   ALTER TABLE ONLY public.file_archive_del DROP CONSTRAINT file_archive_pkey;
       public            barte    false    218            �           2606    32872    files files_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id_file);
 :   ALTER TABLE ONLY public.files DROP CONSTRAINT files_pkey;
       public            barte    false    220            �           2606    32874    owners owners_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.owners
    ADD CONSTRAINT owners_pkey PRIMARY KEY (id_owner);
 <   ALTER TABLE ONLY public.owners DROP CONSTRAINT owners_pkey;
       public            barte    false    222            �           2606    32875    owners owners_id_file_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.owners
    ADD CONSTRAINT owners_id_file_fkey FOREIGN KEY (id_file) REFERENCES public.files(id_file);
 D   ALTER TABLE ONLY public.owners DROP CONSTRAINT owners_id_file_fkey;
       public          barte    false    220    3212    222            �           2606    32880    owners owners_id_user_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY public.owners
    ADD CONSTRAINT owners_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.appusers(id);
 D   ALTER TABLE ONLY public.owners DROP CONSTRAINT owners_id_user_fkey;
       public          barte    false    214    3206    222            !   ?   x�3�tJ,*I��tN-I-J�L�����s3s���s9K�S���1gIjq	���(F��� <z?      ,      x�3�42�4����� �      #   j   x�ƻ@0 ���+�.��V��$�E��&\����Y]te^��1I���q�_����N��#��p��3y�=�@�L��������JK:P��B|,�5      %   +   x���4202�50�52V02�25�21�60�4�41����� p��      '   �   x�m�=ND1�:��(O�؎�m9�*���]�D�����RYY3� <=��GD�#�.eOM�G`�Գ�D.�xP3�2]L%�J�ːx�+���D���rJeGJ�� 52��M8\����w�]f����vYטBS�m��>s3������搜���K�|�( ��������!�!�C��۶� �S@z      )      x�3��4�41�26 ��\1z\\\ !��     